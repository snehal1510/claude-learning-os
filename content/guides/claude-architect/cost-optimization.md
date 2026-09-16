# Cost Optimization

## Overview

At production scale, Claude API costs can be significant. Architects must understand the cost levers available — model selection, prompt caching, token efficiency, batching, and intelligent routing — and apply them appropriately. The exam tests not just what each technique does, but when to apply each and what the tradeoffs are.

## Key Concepts

### Pricing Model

Claude pricing is based on tokens: you pay for **input tokens** and **output tokens** separately. Output tokens are more expensive than input tokens (roughly 3-5x). Key implications:
- Minimize unnecessary output (don't ask for lengthy explanations when a short answer suffices)
- Prompt caching saves on repeated input tokens
- Model selection is the highest-leverage single decision

### Model Selection Hierarchy

| Model Tier | Use Case | Cost |
|------------|----------|------|
| Claude Haiku | Simple classification, routing, extraction | Lowest |
| Claude Sonnet | General tasks, reasoning, code | Medium |
| Claude Opus | Complex reasoning, architecture, nuanced judgment | Highest |

**Principle**: Use the cheapest model that meets quality requirements. Route simple tasks to Haiku; reserve Opus for tasks where quality difference matters.

### Prompt Caching Economics

For repeated large contexts (system prompts, documents, tool definitions):
- First request: cache creation = **125%** of base input cost (slight premium)
- Subsequent requests: cache reads = **10%** of base input cost (90% savings)
- Break-even: approximately 1.25 requests (effectively the 2nd request pays off)

High-value caching candidates:
- Long system prompts used in every request
- Reference documents provided with each conversation turn
- Tool definitions (especially large tool sets)
- Earlier conversation history in multi-turn workflows

### Batching with the Message Batches API

For non-time-sensitive workloads (data labeling, content moderation, document processing):
- Submit up to 10,000 requests in one batch
- Batch requests are processed asynchronously (within 24 hours)
- Cost: **50% discount** on all tokens in the batch

When to use batches:
- Labeling/classification jobs
- Offline document processing
- Nightly data enrichment
- A/B testing prompt variations

### Token Efficiency Techniques

**Concise system prompts**: Every wasted word costs money at scale. Audit system prompts for redundancy.

**Structured output**: JSON responses are often shorter than prose explanations. Request only what you need.

**Few-shot examples**: Balance quality improvement against token cost. One good example often beats three mediocre ones.

**Stop sequences**: Use stop sequences to prevent Claude from generating beyond the useful portion of the response.

**max_tokens**: Set to a realistic ceiling, not an arbitrary large number. Doesn't affect cost (you pay for actual output) but setting it appropriately prevents runaway responses.

### Intelligent Routing

Route requests based on complexity:
1. Classify request complexity (cheap, fast Haiku call)
2. Route simple requests to Haiku
3. Route complex requests to Sonnet
4. Route only the most demanding to Opus

The classification call costs a small amount but saves significantly on the main call when most requests are simple.

### Caching at the Application Layer

Cache Claude's responses for identical or near-identical requests:
- Exact-match cache: same prompt → cached response (Redis/Memcached)
- Semantic cache: similar prompts → cached response (vector similarity threshold)

Works best for FAQ-style systems where many users ask the same questions.

## Important Details

- Batch API discount is 50% — highest single discount available
- Prompt cache writes cost MORE (125%), reads save MOST (10%)
- Output tokens are typically 3-5x more expensive than input — concise instructions matter less than concise outputs
- Token counting endpoint is free (minimal) — use it to instrument and alert on token usage

## Common Exam Traps

**Trap 1: max_tokens controls cost.** False. You pay for ACTUAL output tokens generated, not the max_tokens limit.

**Trap 2: Prompt caching always saves money from the first request.** False. Cache creation costs 25% more. Savings start from the 2nd request that hits the cache.

**Trap 3: Batch API is for real-time applications.** False. Batch API has up to 24-hour SLA. Use it only for offline/async workloads.

**Trap 4: Using Opus for everything is the safe choice.** False. It's the expensive choice. Proper model routing is an architecture responsibility — default to the cheapest model that meets quality requirements.

## Practice Tips

Exam scenarios often give a use case and ask you to design the cost-optimal architecture. Ask yourself: Is the task simple (route to Haiku)? Is there a large repeated context (add caching)? Is it async/batch (use Batch API)? Are outputs unnecessarily verbose (add stop sequences / format constraints)?
