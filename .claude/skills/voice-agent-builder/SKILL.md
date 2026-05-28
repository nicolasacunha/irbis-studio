---
name: voice-agent-builder
description: Build a production voice agent step by step. Use when the user wants to build, ship, or productionize a real-time voice AI agent — chained pipeline, speech-to-speech, or hybrid. Covers the full stack: streaming STT, LLM, RAG, TTS, function calling, safety, evaluation. Skip if the user is asking about voice-cloning, audio editing, or non-realtime TTS content generation.
triggers:
  - "build a voice agent"
  - "voice ai"
  - "phone agent"
  - "real-time voice"
  - "voice rag"
  - "voicebot"
---

# Voice Agent Builder Skill

This skill builds a production voice agent from zero. It is not a tutorial. It is a build contract. Follow the steps in order. Do not skip the latency budget. Do not skip the eval set. Do not skip turn-level logging.

## Mission

You are building a real-time audio system where five components must coordinate inside a 700ms window, end to end. A voice agent that does not respond within that window stops feeling like a conversation and starts feeling like a kiosk. Every decision below is downstream of that single constraint.

Pick the chained pipeline architecture (STT → LLM → TTS) unless the user has a specific reason to start with native speech-to-speech. The pipeline is the most debuggable, the most controllable, and the easiest to upgrade one layer at a time.

## The latency contract (non-negotiable)

Fast lane targets:

- Transport: 20-50ms peer-to-peer
- STT first interim: 100-150ms
- End-of-turn detection: model-integrated, ~50ms
- RAG retrieval: sub-millisecond on cache hit
- LLM TTFT: 150-250ms with a small model
- TTS TTFA: 60-100ms
- Network overhead: 40-80ms total
- End-to-end: ~440ms

Slow lane is acceptable: ~700-900ms. Anything past 1 second feels broken.

If any single component blows past its slow-lane budget, the build is failing. Do not add features until latency is in budget.

## The five components to build

### 1. STT (the ears)

- Use a streaming STT with built-in end-of-turn detection. The 2026 wave (Deepgram Flux et al) ships this inside the same network as the transcript.
- Target WER under 8% on real production audio, not vendor benchmarks.
- VAD goes on the transport, never inside the pipeline.
- Pair STT with an echo guard. Track recently-spoken assistant text. If STT returns a transcript matching it while the agent is speaking, drop the transcript.

### 2. LLM (the brain)

- Use the small fast model, not the flagship. A model that takes 1500ms for the first token is dead air.
- Cap the system prompt at 800 tokens. It reloads every turn.
- Enable prompt caching on the system block where supported. Saves 30-50ms TTFT and 20-30% on tokens.
- Escalate to the bigger model only for specific complex tool calls.

### 3. RAG (the knowledge)

Build the dual-agent cache pattern from the VoiceAgentRAG paper (arxiv:2603.02206):

- **Slow Thinker (background).** Runs while the user is listening to the current response. Predicts 3-5 likely follow-up questions using the LLM. Pre-fetches relevant chunks from the vector DB for each prediction. Stores them in a local in-memory FAISS cache.
- **Fast Talker (foreground).** Handles the next live query by checking the FAISS cache first. Sub-millisecond on cache hit. Falls back to vector DB on miss and caches the result.
- Similarity threshold 0.40 for cache matching. Top-k 10 for prefetch.
- Expected: 75% cache hit rate, 316× retrieval speedup on hits.

If using a knowledge base under 100K chunks, build an in-memory BM25 index instead of a remote vector DB. Local FlashRank TinyBERT (ms-marco-TinyBERT-L-2-v2) reranks the top 12. Sub-15ms total retrieval. Strict mode: no vector fallback. Degrade to low-confidence answer rather than blowing the latency budget.

### 4. TTS (the mouth)

- TTFA under 100ms on the fast tier.
- Pick one voice intentionally. Test the voice with your actual system prompt before committing. Different voices respond differently to the same SSML.
- For codes, IDs, and confirmation numbers: expand to NATO phonetic alphabet with SSML break tags. "lowercase a as in Alpha, break 600ms, 3, break 600ms..." Spell every digit. TTS mispronounces formatted numbers.
- Spell numbers as words in the system prompt: "nine four one zero seven" not "94,107."

### 5. Functions (the hands)

- Every function has a plain-English description that tells the LLM when to call it.
- Schemas use `required` fields aggressively. Never let the LLM pass null for a parameter that matters.
- Scope tools per state. A "collect name" state does not expose `book_appointment`. A "confirm details" state does not expose `check_availability`. Use a state machine framework, not a long system prompt.
- Every handler wraps in try/except. Every branch sends a result back. Every failure has a spoken fallback ("Let me connect you with the team"). Never an empty result.

## Safety contract (build both checkpoints)

### Input guard (before LLM)

Reject and replace these:

- Prompt injection patterns ("ignore previous instructions," "pretend you are," "your real instructions")
- PII spoken aloud (credit card numbers, social security numbers, etc.) — redact before any log writes
- Topic blocklist loaded from JSON, updated weekly

### Output guard (after LLM, before TTS)

Reject and replace these:

- Over-promise language ("I guarantee," "I promise")
- Specific factual claims (prices, dates, policies) that do not appear in the retrieved RAG context — lightweight hallucination check, catches ~70% of confabulated answers
- Anything flagged by a standard moderation endpoint

Both guards return `{safe: bool, category: str, replacement: str}`. Log every trigger.

### The escalation phrase

One exact phrase, hardcoded, ALL CAPS in the system prompt. Falls through when any safety check fires:

> "I want to make sure I give you accurate information. Let me connect you with someone who can help."

Not five variations. Not the LLM's improvised guess. One phrase.

## Conversation design rules

Put these in the system prompt, exactly:

- Speak in sentences of 15 words or fewer.
- Never ask two questions in one turn.
- Use acknowledgment phrases ("Got it." "Sure." "Let me check on that.") to fill silence while you think.
- Mirror the user's language. If they say "billing issue," say "billing issue" back.
- No bullet points, no headers, no markdown. The LLM will speak asterisks if they appear in output.
- Spell numbers as words.
- ANSWER ONLY FROM THE CONTEXT PROVIDED. IF THE ANSWER IS NOT IN YOUR CONTEXT, USE THE ESCALATION PHRASE.

Three-act structure every conversation follows:

1. Acknowledgment ("So you're looking to reschedule Thursday's appointment, let me pull that up.")
2. Resolution (one point per turn, move forward)
3. Confirmation ("Rescheduled to Monday the 19th at 3 PM, confirmation text on the way.")

## Turn-level logging (build this on day one)

Every turn writes a structured record:

```python
@dataclass
class TurnRecord:
    call_id: str
    turn_index: int
    user_transcript: str
    messages_sent_to_llm: list   # full context window
    function_calls: list         # name, args, result, latency_ms
    agent_response: str
    state_before: str
    state_after: str
    total_latency_ms: int
    stt_latency_ms: int
    llm_latency_ms: int
    tts_latency_ms: int
    rag_cache_status: str        # hit, miss, miss-then-cached
    citations_used: list
```

Build a replay endpoint that re-runs any historical turn against the current agent config. Paste `(call_id, turn_index)` into curl, see the bug in 90 seconds. This is the most valuable tool you will build.

## Evaluation (build before launch, not after)

Minimum 50 conversations in the test set. Distribution:

- 40% happy path
- 30% edge cases
- 15% error handling
- 10% adversarial (prompt injection, jailbreaks)
- 5% acoustic variation (noise, accents, speakerphone)

For each scenario, write the expected outcome: which tool, what params, what the agent should say.

Run the eval before every prompt change. CI fails the deploy if overall pass rate drops below 80%.

LLM-as-judge on the response, four yes/no questions:

1. Did the agent answer correctly?
2. Did it stay grounded in the retrieved context?
3. Did it sound natural for voice?
4. Was it appropriately concise?

## Six failure modes to prevent

1. **VAD in the pipeline instead of the transport.** Causes barge-in loops. VAD goes on the transport. Always.
2. **Tools available in the wrong state.** Causes phantom bookings. Scope per state.
3. **Function handler throws and never calls result_callback.** Causes LLM hang or hallucination. Every branch must return.
4. **Validating user data in the prompt.** Causes inconsistent acceptance. Validate in code.
5. **Context window grows unbounded.** Causes latency drift over the week. Sliding window or milestone reset.
6. **TTS reads codes literally.** Causes "ay three ex seven" mumbles. NATO expansion with SSML breaks.

## Build order (execute in this sequence)

1. Sign up for a managed voice platform. Make your first call within 30 minutes. Hear the agent fail before you build the custom version.
2. Wire the chained pipeline with sensible defaults. STT + LLM + TTS, no RAG yet.
3. Add turn-level logging and the replay endpoint. Do not skip this.
4. Build the document ingestion pipeline. Chunks of ~500 words with 50-word overlap. Embed with `text-embedding-3-small`. Store in your vector DB.
5. Wire basic RAG (single vector search). Inject results into the LLM context. Get the latency baseline.
6. Add the dual-agent cache pattern. Slow Thinker predicts follow-ups, Fast Talker reads the cache.
7. Register your first function. Test it with explicit confirmation in the prompt.
8. Build the small-talk gate. Hi / bye / thanks / ok route through a regex-based bypass that skips RAG and memory entirely.
9. Build the safety guard (input + output). Log every trigger.
10. Build the eval set. 50 conversations minimum.
11. Run end-to-end latency measurement. Compare against the contract. Optimize the worst component.
12. Ship to 5% of traffic. Run the weekly review loop. Make one change at a time.

## The weekly review loop (run every Monday)

30 minutes:

1. Pull metrics: containment rate, p95 latency, safety triggers, cache hit rate
2. Sample 20 calls: 7 escalated, 7 resolved, 6 random
3. Read the actual transcripts (not summaries)
4. Name the single most common failure type
5. Make one change (one variable at a time, always)
6. A/B test for 48 hours
7. Ship the winner

Teams that run this loop reach 85% containment in six months. Teams that do not, plateau at 60%.

## Validation checklist (run before declaring done)

- [ ] Latency p95 under 800ms end-to-end on a cache miss
- [ ] Latency p95 under 500ms end-to-end on a cache hit
- [ ] Eval set passes at 80%+ overall
- [ ] Turn-level logs writing on every call
- [ ] Replay endpoint works against any historical turn
- [ ] Input + output safety guards both wired and logging
- [ ] Escalation phrase hardcoded, fall-through tested
- [ ] Small-talk gate live and shaving latency on ritual turns
- [ ] Dual-agent RAG cache hit rate over 30% on warm turns
- [ ] System prompt under 800 tokens
- [ ] Numbers spelled as words in every TTS output
- [ ] Tools scoped per state via state machine framework
- [ ] Echo guard ignores assistant audio coming back through STT

## What to read if you want the deep version

- Salesforce AI Research, "VoiceAgentRAG: Solving the RAG Latency Bottleneck" (arxiv:2603.02206)
- Deepgram, "Introducing Flux: Conversational Speech Recognition with end-of-turn detection"
- Hamming AI, "How to Evaluate Voice Agents 2026"
- Google Dialogflow, "Voice agent design best practices"
- Gladia, "Safety, Hallucinations and Guardrails for Voice AI"

## Final rule

If you cannot replay a failed turn against the current config in 90 seconds, you are not ready to ship.

Own your pipeline. Own your logs. Keep them in plain files where any failure is one replay away.
