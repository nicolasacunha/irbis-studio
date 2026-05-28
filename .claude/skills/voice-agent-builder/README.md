# voice-agent-builder

A field manual for shipping a production voice AI agent in 2026.

This repo contains two things:

1. **[BUILDERS_GUIDE.md](./BUILDERS_GUIDE.md)** — the long-form Builder's Guide. ~4,857 words. The article. Read this if you want the narrative, the architecture, the war stories, and the 90-day arc.
2. **[SKILL.md](./SKILL.md)** — the skill file. ~1,800 words. A self-contained, executable build contract that any skill-aware AI agent (Claude Code, Cursor, OpenClaw, Hermes) can load and follow. Hand this to your agent if you want the article *built* instead of read.

A third long-form article will be added later.

---

## What this is

A voice agent is not a chatbot with a microphone bolted on. It is a real-time audio system where five components have to coordinate inside a 700ms window, or the conversation stops feeling like a conversation.

This repo is the playbook for getting that right. Not theory. Not vendor marketing. The specific decisions and tradeoffs from someone who built one, broke it three times, and rebuilt it four times in 90 days.

It covers:

- The three architectures of 2026 (chained pipeline, half-cascade, native speech-to-speech) and which to start with
- The five components every chained pipeline has (STT, LLM, RAG, TTS, function-calling) and the production failure modes for each
- The latency budget — the single non-negotiable that shapes every other decision
- The dual-agent RAG cache pattern from Salesforce AI Research's VoiceAgentRAG paper (316× retrieval speedup, 75% cache hit rate on warm turns)
- The two-checkpoint safety architecture (input guard before the LLM, output guard before TTS)
- Conversation design rules (writing for ears, not eyes)
- Evaluation — the four-layer framework, test set distribution, and the weekly review loop that compounds quality over time
- The six failure modes that will hit you in production
- The build order — twelve steps from "first call in 30 minutes" to "ship to 5% of traffic"

## Who this is for

You, if you are:

- Building your first production voice agent and want to skip the six weeks of expensive mistakes
- Already shipped one and wondering why it plateaued at 60% containment
- Choosing between a managed platform and a custom build
- Auditing a voice agent system someone else built and looking for the load-bearing decisions

You, if you are not:

- Building a voice-cloning product (different problem)
- Building a non-realtime TTS content generator (different problem)
- Looking for a research paper survey (this is a build manual, with citations)

## How to use this repo

### Path 1: Read the article

```
open BUILDERS_GUIDE.md
```

If you read in linear order: opening hook → five components → latency budget → dual-agent RAG → conversation design → safety → eval → 90-day arc → failure modes → things I would do differently → conclusion. Roughly 25 minutes to read.

### Path 2: Hand the skill to an AI agent

```
# In Claude Code
/skill voice-agent-builder

# Or paste SKILL.md into any LLM with: "Build a voice agent following this skill."
```

The skill file has:

- A latency contract (non-negotiable budget per component)
- Step-by-step build order (12 steps)
- A validation checklist (13 items)
- Six failure modes to prevent
- The escalation phrase, the safety guards, the eval set composition
- The weekly review loop

Any skill-aware coding agent can load this and execute the build. The article gives you the *why*. The skill gives you the *how*.

## The latency contract (the central thing)

If you take one piece of architecture home, take this:

```
Fast lane targets (cache hit):
  Transport            20-50ms
  STT first interim    100-150ms
  End-of-turn          ~50ms (model-integrated)
  RAG retrieval        sub-millisecond (cache hit)
  LLM TTFT             150-250ms (small model)
  TTS TTFA             60-100ms
  Network overhead     40-80ms total
  END-TO-END           ~440ms

Slow lane targets (cache miss):
  END-TO-END           ~700-900ms (acceptable, not great)
```

Anything past one second feels broken. Anything past two and the caller starts talking over the agent. Every architectural decision in the guide is downstream of this budget.

## The two biggest 2026 unlocks

1. **Model-integrated end-of-turn detection.** The new wave of streaming STT models ships with a turn-complete signal inside the same network as the transcript. Replaces "silence threshold plus separate VAD" with a semantic turn-end classifier. Buys 200-400ms back on every turn.
2. **Speculative prefetch with a dual-agent cache.** Run a background agent that predicts the next 3-5 likely follow-up questions while the user is hearing the current response. Pre-fetches the relevant chunks. The foreground agent reads from cache instead of hitting the vector DB. 40% of turns hit the cache. The other 60% pay the normal cost.

Everything else is rounding error compared to those two.

## What is in each file

### BUILDERS_GUIDE.md
The article. Long-form. First-person narrative. ~4,857 words. Bulleted structure with H2/H3 sections. Includes the 90-day arc (week-by-week of what got built, what broke, and what got fixed) and the six failure modes appendix with problem/solution per mode.

### SKILL.md
The skill file. Executable build instructions. ~1,800 words. YAML frontmatter with name, description, and triggers so any skill-aware agent can route to it. Body is the latency contract, the five component build specs, the safety contract, conversation design rules, the eval requirements, the failure modes, and the twelve-step build order.

## Citations and source material

The guide draws on the following primary sources:

- Salesforce AI Research — ["VoiceAgentRAG: Solving the RAG Latency Bottleneck in Real-Time Voice Agents Using Dual-Agent Architectures"](https://arxiv.org/abs/2603.02206) (March 2026)
- Deepgram — ["Introducing Flux: Conversational Speech Recognition with end-of-turn detection"](https://deepgram.com/learn/introducing-flux-conversational-speech-recognition)
- OpenAI — ["Voice agents guide"](https://developers.openai.com/api/docs/guides/voice-agents)
- Hamming AI — ["How to Evaluate Voice Agents 2026"](https://hamming.ai/resources/how-to-evaluate-voice-agents-2026)
- Google Dialogflow — ["Voice agent design best practices"](https://docs.cloud.google.com/dialogflow/cx/docs/concept/voice-agent-design)
- Gladia — ["Safety, Hallucinations and Guardrails for Voice AI"](https://www.gladia.io/blog/safety-voice-ai-hallucinations)
- NVIDIA Developer — ["Voice Agent with RAG and Safety Guardrails"](https://developer.nvidia.com/blog/how-to-build-a-voice-agent-with-rag-and-safety-guardrails/)

## License

Content is released under CC BY 4.0. Use it, adapt it, ship it. Attribution appreciated but not required.

## A note on the format

The Builder's Guide format is a long-form article style optimized for X (Twitter) bookmark depth. It uses lowercase opening hooks, period-fragment paragraphs, two-clause aphorisms, a 90-day narrative arc with cinematic moments, a failure-modes appendix, and a three-imperative closer. The skill file uses standard frontmatter + bulleted instructions. Two formats, one set of decisions.

---

*The first agent took a weekend. The production system took ten weeks. It has been getting better every day since, without anyone touching it.*
