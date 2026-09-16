# System Design Patterns

## Overview

The Architect certification exam culminates in system design: given a real-world problem, design a Claude-based system that is reliable, cost-effective, safe, and maintainable. This guide covers the canonical patterns used in production Claude deployments and the decision framework for choosing between them.

## Key Concepts

### Pattern 1: Prompt Chaining

Break a complex task into sequential steps. Each step's output becomes the next step's input.

```
Step 1: Extract key entities from document
    ↓ entities
Step 2: Look up additional context for each entity
    ↓ enriched entities
Step 3: Draft summary using enriched context
    ↓ summary
Step 4: Quality-check and refine summary
    ↓ final output
```

**When to use**: Tasks where quality improves through refinement, or where intermediate outputs can be validated.

**Tradeoff**: Latency increases linearly with steps. Total cost = sum of all steps.

### Pattern 2: Routing

A classifier (lightweight Claude or keyword rule) routes requests to specialized handlers.

```
Input → Classifier (Haiku) → Route A: Simple FAQ (Haiku)
                            → Route B: Complex reasoning (Sonnet)
                            → Route C: Code generation (Opus)
```

**When to use**: Mixed workloads with varying complexity. Most requests are simple; some require heavy lifting.

**Tradeoff**: Adds latency for the classification step; can misroute edge cases.

### Pattern 3: Parallelization

Independent subtasks run concurrently; results are merged.

```
Input → Orchestrator → [Worker A | Worker B | Worker C]
                    ← Merge results
                    → Final synthesis
```

**When to use**: Tasks that can be cleanly partitioned (e.g., analyze 10 documents simultaneously).

**Tradeoff**: All workers must complete before synthesis begins — slowest worker determines latency.

### Pattern 4: Evaluator-Optimizer Loop

Claude generates → Claude (or a separate agent) evaluates → Loop until quality threshold met.

```
Generator: Produce draft
    ↓
Evaluator: Score against criteria
    ↓ (if below threshold)
Generator: Refine based on evaluation
    ↓ (repeat until threshold met or max iterations)
Output
```

**When to use**: High-quality outputs where latency is acceptable; creative tasks; code generation with test verification.

**Tradeoff**: Non-deterministic number of iterations. Implement a max iteration cap to bound cost and latency.

### Pattern 5: Human-in-the-Loop Escalation

Automated system handles high-confidence cases; routes low-confidence or high-risk cases to humans.

```
Request → Claude (with confidence scoring)
         → High confidence, low risk: Automated response
         → Low confidence: Human review queue
         → High risk action: Human approval gate
```

**When to use**: Customer service, content moderation, agentic actions with irreversible consequences.

**Tradeoff**: Human review introduces latency; must define clear escalation criteria.

### Pattern 6: Memory and State Management

Claude is stateless by design. For persistent state:

| State Type | Implementation |
|------------|----------------|
| Short-term (session) | Messages array passed each turn |
| Medium-term (user facts) | External DB + retrieved on session start |
| Long-term (knowledge) | RAG system + vector database |
| Structured state | JSON state object injected into system prompt |

### Reliability Patterns

**Retry with exponential backoff**: For 429 (rate limit) and 500/529 (server errors).

**Circuit breaker**: After N consecutive failures, stop sending requests for a cool-down period before retrying. Prevents cascade failures.

**Graceful degradation**: If Claude is unavailable, fall back to cached responses, simpler models, or static templates.

**Idempotency**: Design tool calls to be safely retryable. An agent that re-runs shouldn't create duplicate records.

### Observability Stack

Production Claude systems require:
- **Tracing**: End-to-end request trace IDs across orchestrator and subagent calls
- **Metrics**: Token usage per request, latency (TTFT + total), error rate, cache hit rate
- **Logging**: Full prompt/response pairs (with PII scrubbing) for debugging
- **Alerting**: Spike in refusals, latency degradation, cost anomalies

## Important Details

- Chain latency compounds: 5 steps × 2s each = 10s minimum
- Parallelization requires managing concurrent API connections — use connection pooling
- Evaluator-optimizer needs a max iteration guard to prevent infinite loops
- Human-in-the-loop gates must be async to not block the main request path

## Common Exam Traps

**Trap 1: Parallelization reduces total token count.** False. Parallelization reduces latency but same total tokens are processed (and same total cost).

**Trap 2: Routing adds no latency.** False. The classification step adds a round-trip. It's usually fast (Haiku) but not free.

**Trap 3: Evaluator-optimizer always terminates.** Only with a max iterations cap. Without it, low-quality content could loop forever.

**Trap 4: Claude maintains conversation state.** False. Each API call is stateless. State must be externalized and re-injected.

## Practice Tips

The architect exam's design questions usually have four parts: (1) choose the right pattern, (2) handle failure modes, (3) optimize cost, (4) ensure safety. Practice working through all four for: a document Q&A system, a code review pipeline, and an autonomous research agent. Cover pattern choice, error handling, routing strategy, and where human gates belong.
