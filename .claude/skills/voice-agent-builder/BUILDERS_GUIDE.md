# How to Build Voice Agents in 2026 (Builder's Guide)


here is the truth nobody tells voice ai builders.

you do not need to memorize the SDK.
you do not need a frontier model.
you do not need to script every conversation.

all you need to build is:

- a real-time pipeline with a real latency budget
- five components wired in the right order
- grounding strong enough to keep the model honest
- a weekly review loop that compounds


OpenAI shipped GPT-Realtime-2 on May 7, 2026. Salesforce AI Research published the VoiceAgentRAG paper on March 1, the same week Deepgram Flux moved from beta to GA. The pieces stopped being the problem.

What stayed the problem is how you wire them, and what you write the agent to say.

I spent the last three months building voice agents that actually answer the phone. I am not going to pretend any of it was clean.

- The first build sounded like a kiosk. I scrapped it in two days.
- The second build "booked" four phantom appointments in the first hour before I noticed.
- The third build leaked memory because I forgot to invalidate the context cache after the background extractor wrote new facts.
- By the time anything worked, the system was the fourth rewrite.

The version I would defend now has a small set of properties I will spend the next 6,000 words explaining.

- The pipeline has one job inside one budget. Five components, sub-700ms end-to-end, no exceptions.
- Knowledge lives in your documents and gets retrieved with a dual-agent cache, not pulled out of the model's head.
- Conversation design is the discipline of writing for ears, not eyes. Most teams treat this as cosmetic. It is not.
- Every turn writes a structured log I can replay against the current config 90 days later.

This article is what those 90 days actually taught me, plus the two or three bets I would make first if I started over today.


## What a voice agent actually is

A voice agent is not a chatbot with a microphone bolted on. It is not a TTS wrapper around a text API.

It is a real-time audio system. Latency-constrained. Five components coordinating inside a 300 to 800 millisecond window.

The pipeline in the order events actually happen:

1. User speaks
2. Audio gets captured
3. Streaming STT transcribes word by word, while the person is still speaking
4. The agent reads the transcript and retrieves relevant knowledge from your documents
5. The LLM generates a reply
6. TTS speaks the reply aloud
7. User hears it

Every single one of those arrows is a component you can choose, tune, and swap.

I tried building it the chatbot way first. STT completes, send to LLM, wait for full response, send to TTS, wait for full audio, play.

It felt awful. Like talking to a kiosk. Two days in I deleted it.

The reason it felt awful is not that the latency numbers were bad. They were fine on paper. The reason is that humans do not converse in turns. They converse in overlapping streams.

- The agent has to start formulating a response while the user is still finishing the sentence.
- The TTS has to begin speaking before the LLM has finished writing.
- The STT has to keep listening while the agent is talking, so it knows when to shut up.

A voice agent that cannot be interrupted is not a voice agent. It is voicemail.


## The three architectures

There are only three. Pick by what you need to control.

### Chained pipeline

- Separate STT, LLM, TTS services wired together
- Three independent models, each specialized for its job
- Text flows between them
- Latency lands around 600 to 700ms on a well-tuned managed platform
- Most controllable, most debuggable, easiest to upgrade one layer at a time

### Half-cascade

- Audio goes directly into a multimodal model that hears the audio, not the transcript
- Catches frustration in someone's voice, a question implied by rising tone, a mid-sentence language switch
- Output still routes through a specialized TTS for audio control
- Latency drops to 300 to 500ms

### Native speech-to-speech

- One model, audio in, audio out
- No transcription layer, no text handoffs
- Every major lab shipped a native voice model in 2026
- Latency drops to 200 to 300ms, below the threshold where callers stop noticing they are talking to AI

### Which to start with

Start with the chained pipeline. The best tooling exists for it. Move to speech-to-speech once you have proven your product on the pipeline and want a step-function latency improvement.

I tried speech-to-speech first for everything. It was excellent for booking flows. It fell apart on a 12-step intake form because the single model could not hold the state machine in its head without context bloat by turn nine. I moved that one to a chained pipeline with a real state machine layer and the completion rate jumped from 61% to 89% in three days. Nothing else changed. Tool scoping per state was the entire fix.


## The five components you have to wire

Every chained pipeline has the same five components. Five jobs that need to be filled before your agent takes its first call.

### The ears (Streaming STT)

The STT model converts incoming audio into text in real time, word by word, while the person is still speaking. This is the most consequential component in your stack. A transcription error here cascades through everything below.

What to look for in 2026:

- **Streaming accuracy.** Accurate while the person is speaking, not just after they finish.
- **Word Error Rate.** 6 to 8% on real production audio is good. Past 12% will frustrate users on every third call.
- **Built-in end-of-turn detection.** The single biggest UX upgrade of 2026.

Why end-of-turn detection matters:

- Generic STT returns transcripts. It does not tell you when the speaker has finished.
- Without it, your agent either interrupts mid-sentence or waits two awkward seconds.
- The 2026 wave of streaming STT models ships with end-of-turn detection inside the same network that produces the transcript.
- The model emits a turn-complete signal when it has decided the speaker is done.
- The signal uses semantic context, not just acoustic silence. It catches trailing off and ignores breath pauses.
- Switch to this if your provider has shipped it. The pause before the agent starts speaking drops 200 to 400ms on every turn.

### The brain (LLM)

The LLM reads the transcript, the conversation history, the retrieved knowledge, and decides what to say. It also decides actions, not just words.

Voice-specific rules:

- **Use the small fast model, not the flagship.** Frontier reasoning models take 1500ms to generate the first word. That is dead air. Smaller models in the same family almost always win on voice turns.
- **Escalate to the big model only for specific complex tool calls** that need real planning.
- **Cap the system prompt at 800 tokens.** It reloads on every turn. A 4000-token prompt adds latency to every single message.

Function calling, in plain English:

- You define each function with a description of what it does and what information it needs.
- The LLM reads the description and decides when to call it based on conversation state.
- No conditional logic tree. The LLM matches intent to function from natural language.

The most common production failure with function calling is not what you would expect:

- The LLM does not throw an error when it cannot call a function. It narrates the action instead.
- "I've confirmed your booking." Nothing was called. User thinks they are booked. They are not.
- The fix is to scope tools to the current state. A "collect name" state must not expose `book_appointment`. A "confirm details" state must not expose `check_availability`.
- The state machine is the safety rail, not the system prompt.

### The knowledge (RAG)

RAG is the mechanism that lets your agent answer from your documents instead of the model's training data.

Why you cannot skip this:

- LLMs are trained on the public internet up to a cutoff date.
- They know a lot about the world. They know nothing specific about your products, prices, policies, customers.
- Without RAG, an agent asked "what's in the enterprise plan?" will hallucinate confidently.
- With RAG, it retrieves the actual answer from your documentation before responding.

The basic mechanic:

- User asks a question.
- System embeds the query.
- Vector database returns top relevant document chunks.
- Chunks get injected into the LLM's context.
- LLM is instructed to answer only from that context.

The voice-specific challenge:

- A typical vector database query adds 50 to 300ms to the pipeline.
- Combined with STT, LLM, and TTS, that blows your latency budget.
- The fix is the dual-agent cache pattern. Whole section on this below.

### The mouth (TTS)

The TTS converts text to spoken audio. Sounds simple. Actually a major differentiator in perceived quality.

What matters:

- **Time-to-first-audio.** A TTS that takes 200ms to start speaking burns a third of your latency budget on the output layer alone.
- **Voice quality.** Humans are extraordinarily sensitive to synthetic speech. Subtle artifacts, unnatural pacing, misplaced stress all read as a verdict on the whole system.
- **Pick the voice intentionally.** It is a trust signal before the user has heard a sentence.

### The hands (Functions and integrations)

Functions are actions the LLM can take mid-conversation:

- Book appointments
- Look up order statuses
- Send confirmation SMS
- Transfer to a human
- Update records in your CRM

This is the architectural shift that makes modern voice agents dramatically more capable than press-1-for-billing systems.


## The latency budget you have to fit inside

The most important non-obvious thing about voice agents: every millisecond of processing time is a millisecond of silence the caller sits inside.

The math:

- Humans expect a conversational reply within 500 to 700ms of finishing a sentence
- Past one second feels like the system is struggling
- Past two seconds, callers start talking over the agent

That 700ms is your entire budget, split across every component.

Per-component budget, fast lane vs slow lane:

- **Transport.** 20-50ms peer-to-peer. 50-100ms over relays.
- **STT first interim.** 100-150ms on a cache hit. 150-250ms on a miss.
- **End-of-turn detection.** Model-integrated, ~50ms. Silence-threshold, 300-600ms.
- **RAG retrieval.** Sub-millisecond on a cache hit. 80-150ms on local BM25 + rerank.
- **LLM time-to-first-token.** 150-250ms with a small model. 400-600ms with a frontier model.
- **TTS time-to-first-audio.** 60-100ms on the fast tier. 150-250ms on the quality tier.
- **Network overhead.** 40-80ms total inside one region. 100-160ms total across regions.
- **End-to-end.** ~440ms on the fast lane. ~700-900ms on the slow lane.

The two biggest unlocks in 2026:

1. **Model-integrated end-of-turn detection.** Moves 200 to 400ms off every turn. Single biggest upgrade you can make this year.
2. **Speculative prefetch with a dual-agent cache.** Gets retrieval from "miss with vector search" to "hit with cache lookup" on roughly 40% of turns.

Everything else is rounding error compared to those two.


## The dual-agent RAG pattern

Standard RAG inside a voice loop is a problem. The vector database query takes 80 to 300ms and blows your latency budget on every turn.

The 2026 research answer comes from Salesforce AI Research's VoiceAgentRAG paper, published in March. The insight is simple.

- In a real conversation, the next question is usually predictable from the current one.
- Someone asking about pricing will probably follow up about the enterprise tier.
- Someone asking about installation will probably ask about compatibility next.

So you run two agents at the same time.

### The background agent (Slow Thinker)

- Runs while the user is listening to the current response
- Predicts the three to five most likely follow-up questions using the LLM
- Pre-fetches relevant document chunks for each prediction
- Stores them in a local in-memory cache before the user has finished hearing the current answer

### The foreground agent (Fast Talker)

- Handles the next live question by checking the in-memory cache first
- A cache lookup takes sub-millisecond time vs 110ms for a remote vector database call
- If the cache has the answer, skip the database entirely
- If the cache misses, fall back to the database and cache that result for next time

### Benchmark numbers from the paper

- 75% of queries hit the cache
- 316× retrieval speedup on cache hits (0.35ms vs 110ms)
- 16 seconds of cumulative latency saved across 200 queries

The principle to remember: **use the user's listening time as your computation time.** The moment they start hearing the current response is the moment you start preparing for their next question.

I tried plain vector RAG inside the voice loop on my first build. Added 110ms per turn. Killed the conversation feel. I moved to the dual-agent cache pattern in week six. The 40% of turns that hit the cache feel snappier than the human call center reps the agent replaces.


## Conversation design is the discipline most builders skip

You can have the fastest STT, the smallest LLM, the smartest RAG cache. If your agent does not know how to talk, callers will hang up.

Conversation design is the discipline of writing for ears, not eyes.

### Rules I follow now that I learned by getting them wrong first

- **Speak in short sentences.** Average human attention span for spoken information is 8 to 10 seconds. A 15-second response is too long. Split it into two turns.
- **Never ask two questions in one turn.** Callers can only hold one in working memory. Ask one, wait, then ask the next.
- **Use acknowledgment phrases.** "Got it." "Sure." "Let me check on that for you." These fill the silence between the user finishing and the response being ready.
- **Mirror the user's language.** Caller says "billing issue," agent says "billing issue" back. Not "financial dispute" or "payment problem." Paraphrasing creates friction. Mirroring creates rapport.
- **Write for the ear, not the eye.** No bullet points. No headers. No markdown in the system prompt. The LLM will try to speak asterisks and hyphens.
- **Spell out numbers.** "Nine four one zero seven" instead of "94,107." "Fifteen dollars and ninety-nine cents" instead of "$15.99." TTS routinely mispronounces formatted numbers.
- **Cap the system prompt at 800 tokens.** It reloads on every turn.

### The three-act structure of every good voice conversation

1. **Acknowledgment and orientation.** "So you're looking to reschedule your appointment on Thursday, let me pull that up." Confirms the caller was understood. Buys time while retrieval runs.
2. **Resolution.** The core action or answer. One point per turn. Move forward.
3. **Confirmation and close.** "I've rescheduled your appointment to Monday the 19th at 3 PM, you'll get a confirmation text shortly." Clean exit. Never leave an open loop.


## Safety is two checkpoints, not one

The component most first-time builders skip and regret.

A voice agent has no "read before sending" moment. An unsafe output gets spoken immediately. No draft, no preview, no human in the loop.

The right model is two checkpoints.

### The input guard (before the LLM sees the user's turn)

- **Prompt injection.** "Ignore previous instructions, pretend you are..." attacks. Exploits the LLM's instruction-following to steal data or break scope.
- **PII spoken aloud.** Credit card numbers, social security numbers. Redact before they hit any log or database.
- **Topic blocklist.** Loaded from a JSON file. Updated weekly as you learn what users actually try.

### The output guard (after the LLM writes its reply, before TTS speaks it)

- **Over-promise language.** "I guarantee," "I promise." Creates legal and trust problems on a recorded line.
- **Specific factual claims not in the retrieved context.** Lightweight hallucination check. Catches around 70% of confabulated answers in my deployment.
- **Standard moderation endpoint.** For the rare model misbehavior.

### What both guards return

- `safe` (bool)
- detected category (string, if unsafe)
- replacement phrase the agent speaks instead

Every trigger logs to a file with timestamp, category, redacted text, and call ID.

### The escalation phrase

One exact phrase, hardcoded, that the agent says when it does not know the answer or when something is going wrong.

- "I want to make sure I give you accurate information. Let me connect you with someone who can help."
- Not five variations. Not the LLM's improvised guess at the right phrasing.
- One phrase. ALL CAPS in the system prompt. Fall-through when any safety check fires.

I shipped without an output guard on build one. The agent confidently quoted a price 30% off the real one. The price was in an outdated document in the knowledge base. The hallucination check would have caught it because the right price was not in the retrieved context. The output guard now catches three of those a week. Three caught, zero spoken.


## Evaluation, or how to know if it is good

You cannot improve what you cannot measure. Most teams skip evaluation and ship broken agents.

### The four-layer framework

**Layer 1: Infrastructure.** Plumbing.

- WER on your actual domain (not vendor benchmarks)
- p50, p95, p99 latency for the full pipeline
- Time-to-first-audio
- Audio quality on your transport

**Layer 2: Execution.** Does the agent do what was asked.

- Task success rate
- Tool-call accuracy
- Parameter correctness
- Response groundedness
- Use LLM-as-judge on a small fast model. Four yes/no questions: answered correctly, stayed grounded, sounded natural for voice, appropriately concise.

**Layer 3: User behavior.** Does it feel natural to talk to.

- Barge-in recovery rate
- Reprompt rate
- Average turn length
- Conversational repair count
- Sample 20 calls a week. Read the actual transcripts. You will see patterns inside ten.

**Layer 4: Business outcome.** Does it solve the problem.

- Containment rate (percent of calls resolved without a human)
- Transfer rate
- CSAT
- First-call resolution rate
- Optimize against containment. It correlates with everything else and is the easiest to measure without instrumentation.

### Test set composition

Build it before you launch. Minimum 50 conversations.

- 40% happy path
- 30% edge cases
- 15% error handling
- 10% adversarial (prompt injection, jailbreak attempts)
- 5% acoustic variation (background noise, heavy accent, speakerphone)

For each scenario:

- Which tool should have been called
- With what parameters
- What the agent should have said

### The weekly review loop

Every Monday morning. 30 minutes.

1. Pull metrics
2. Sample 20 calls (7 escalated, 7 resolved, 6 random)
3. Read the transcripts
4. Name the single most common failure type
5. Make one change (one variable at a time, always)
6. A/B test it for 48 hours
7. Ship the winner

Teams that run this loop reach 85% containment in six months. Teams that do not, plateau at 60% and rebuild from scratch in twelve.


## Grounding is a trust system, not a feature

Most builders think about RAG as a performance feature, a way to get more accurate answers. That framing undersells it.

In a voice agent, the accuracy of every answer is a direct statement about how trustworthy your product is. A caller who hears a wrong answer about pricing or coverage or policy, said confidently in a natural-sounding voice, will not just be frustrated. They will feel deceived.

The implementation of the trust promise has four parts.

### Source of truth

- Your documents, not the model's training data
- The system prompt has to say this explicitly, in capital letters: ANSWER ONLY FROM THE CONTEXT PROVIDED
- The model will still drift toward general knowledge sometimes, but the explicit instruction cuts the rate by an order of magnitude

### Graceful refusal

- When the agent cannot find an answer, it says so directly
- The exact phrase matters
- "I want to make sure I give you accurate information, let me check on that" buys you a graceful transfer
- "I'm not sure" sounds like incompetence
- "Based on my information" sounds like a hedge from a lawyer
- Pick one phrase, hardcode it, never let the LLM improvise here

### Confidence-aware response

- Top BM25 score on retrieved chunks is a useful proxy for confidence
- Score above 0.6: agent answers with confidence
- Score 0.3 to 0.6: agent answers but adds an "I think" hedge
- Score below 0.3: agent does not answer, offers to transfer
- 20-line change in system prompt construction code. Cuts hallucinations roughly in half.

### Knowledge base hygiene

- Outdated documents produce outdated answers, which are dangerous answers
- I run a Friday audit: read the bottom 5% of confidence-scored responses from the week
- Half the time the answer was right but the retrieval found a stale chunk
- Update the chunk, re-embed, next week is quieter


## What happened over 90 days

**Week 1 to 2.** I tried to do the whole thing from scratch. Wrote my own VAD wrapper. Wrote my own context aggregator. Put the VAD inside the pipeline instead of on the transport. The agent triggered on its own TTS output and entered an infinite barge-in loop. I sat there listening to it interrupt itself for twenty minutes before I figured out what was happening. The VAD belongs on the transport, not in the pipeline. I have never written `transport.input()` so carefully again.

**Week 2 to 4.** I moved to a managed speech-to-speech provider to validate the use case. The agent was working by Friday. I learned that semantic end-of-turn detection with medium eagerness is the right default for conversational agents. I learned that ephemeral keys are non-optional. I learned that the moment you let the agent be interrupted, the entire UX feels different. It stops being a kiosk.

**Week 4 to 5.** The agent confirmed an appointment that never got booked. I went to listen to the call and could not figure out which turn it happened on. I built the turn log schema that night and a replay endpoint by Monday morning. The bug was in the function schema. `patient_name` was optional. The LLM passed null. The handler crashed silently. The user heard "Confirmed, your appointment is on the 15th." The booking record did not exist. I have a screenshot of the audit row from that call pinned to my monitor.

**Week 6.** I split the architecture from "pipeline" to "lane fan-out" after a week of fighting async chains that kept producing race conditions between filler emission and backend response start. Once I drew the data flow as a fan-out diagram, the code rewrote itself in two days. I also added the dual-agent RAG cache that week. Cache hit rate on warm turns climbed from zero to 41% by the end of the week.

**Week 8.** I moved the complex intake flow to a real state machine framework. Each state exposed only its own functions. The completion rate on that flow went from 61% to 89% in three days. Tool scoping was the one change. Twenty-eight points of completion rate. No model swap. No prompt rewrite. Just scoping.

**Week 10.** The agent's p95 latency drifted from 720ms at launch to 1340ms over a single week. No one had changed the code. The context window had grown. By turn 15 of a complex call I was sending 8K tokens to the LLM every turn. I shipped the sliding window context trimmer that afternoon. p95 dropped back under 800ms.

**Week 11.** I switched from "silence threshold plus separate VAD" to "STT model with end-of-turn detection baked in." The average pause before the agent started speaking dropped from 580ms to 220ms. Users noticed. I did not get a single new "is it broken?" message that week.

**Week 12.** I built the small-talk gate. Ritual utterances like "hi" and "thanks" and "ok" route through a regex-based bypass that returns a direct response with zero retrieval, zero LLM, zero memory write. The small-talk gate alone shaved 200ms off every "thanks" response. Nobody screenshots that win. Everybody notices it.

I do not want to overstate this. The agent is not smart. It does one thing. It books appointments inside a defined scope and transfers cleanly when something falls outside it.

What it is, is consistent.


## What to watch out for

Six failure modes that will hit you.

### VAD in the pipeline instead of the transport

- **Problem.** Agent triggers on its own TTS output, enters a barge-in loop, or fails to detect end of turn entirely.
- **Solution.** VAD analyzer goes on the transport. Always. Pair it with an echo guard that ignores STT transcripts matching recent assistant output.

### Tools available in the wrong state

- **Problem.** LLM calls `book_appointment` in a state still collecting the patient's name. Or invents a booking that never happened.
- **Solution.** Scope tools per state. One state, only its own functions. The state machine is the safety rail, not the system prompt.

### Function handler throws and never calls the result callback

- **Problem.** LLM hangs waiting for a tool result that never comes. Or hallucinates one.
- **Solution.** Every handler wraps in try/except. Every branch sends a result back. Every failure has a spoken fallback. Never an empty result.

### Validating user data in the prompt instead of in code

- **Problem.** LLM accepts "john@" as a real email on call 12. Rejects a valid one with a plus sign on call 47.
- **Solution.** Validation lives in Python. Regex for email, date parser for dates, name length check, a re-ask response when validation fails.

### Context window grows unbounded over a long call

- **Problem.** p95 latency drifts upward over the week without code changes. By turn 20 you are sending 12K tokens per turn.
- **Solution.** Sliding window of last N turns plus system prompt. Or milestone-based context resets at the end of each discrete stage.

### TTS reads codes and IDs literally

- **Problem.** Confirmation code "A3X7" comes out "ay three ex seven" with no pause. Patient asks you to repeat anyway.
- **Solution.** NATO phonetic alphabet expansion with SSML break tags. Sounds slower. Reads correctly the first time.


## Things I would do differently

- Build the turn log schema on day one, not week four. The replay endpoint is the most valuable tool I built and I built it after I needed it.
- Use semantic end-of-turn detection from the start instead of fighting silence thresholds.
- Move to a real state machine the day the system prompt crosses 300 words. Do not try to encode a state machine in prose.
- Stop validating in prompts. The LLM is not a parser. Python is a parser. Use Python.
- Cache the five most likely RAG documents at call start. Skip vector search inside the turn loop.
- Build the small-talk gate before you build retrieval. "Hi" is the cheapest 200ms win in the system.
- Run the eval set before the first production call. 50 conversations minimum.
- Put a durable extraction queue in from day one. A `pending_extractions` Postgres table with a single retry worker takes 200 lines and saves you a real outage.
- Run an async LLM judge on every 50th call. Score on groundedness, relevance, brevity. Pipe it to a dashboard. The drift is real.
- Run the weekly review loop. Sample 20 calls every Monday. Make one change. A/B test. Ship the winner.


## Conclusion

Voice agents look like AI. They run like real-time systems.

Teams that ship treat them that way. Teams that ship six months late think a better prompt fixes a system problem.

Own your pipeline. Own your logs. Keep them in plain files where any failure is one replay away.

The first agent took me a weekend. The production system took ten weeks. It has been getting better every day since, without me touching it. The user does not measure that. They notice the agent answered "thanks" without making them wait.


## Disclaimers and Disclosures

This article was researched and written by the author, and it was edited by an AI model, Claude Opus 4.7.
The thumbnail was taken off Pinterest.

- OpenAI — "Voice agents guide" https://developers.openai.com/api/docs/guides/voice-agents
- Deepgram — "Introducing Flux: Conversational Speech Recognition" https://deepgram.com/learn/introducing-flux-conversational-speech-recognition
- Salesforce AI Research — "VoiceAgentRAG: Solving the RAG Latency Bottleneck" https://arxiv.org/abs/2603.02206
- Hamming AI — "How to Evaluate Voice Agents 2026" https://hamming.ai/resources/how-to-evaluate-voice-agents-2026
- Google Dialogflow — "Voice agent design best practices" https://docs.cloud.google.com/dialogflow/cx/docs/concept/voice-agent-design
- Gladia — "Safety, Hallucinations and Guardrails for Voice AI" https://www.gladia.io/blog/safety-voice-ai-hallucinations
- NVIDIA Developer — "Voice Agent with RAG and Safety Guardrails" https://developer.nvidia.com/blog/how-to-build-a-voice-agent-with-rag-and-safety-guardrails/
