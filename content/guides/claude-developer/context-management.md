# Context Window & Management

## Overview

Claude's context window is the maximum amount of content (input + output) that can be processed in a single request. Managing this window efficiently — knowing the limits, what to include, how to handle overflows, and how to count tokens — is essential for production applications.

As conversations grow, older messages must eventually be removed, summarized, or handled with external storage to prevent errors and control costs.

## Key Concepts

### Context Window Sizes

| Model | Context Window | Max Output |
|-------|---------------|------------|
| Claude Opus 4 | 200,000 tokens | 32,000 tokens |
| Claude Sonnet 4 | 200,000 tokens | 64,000 tokens |
| Claude Sonnet 3.5 | 200,000 tokens | 8,192 tokens |
| Claude Haiku 3.5 | 200,000 tokens | 8,192 tokens |

All current Claude models share 200K input context. Output limits vary by model.

**Important**: The context window covers BOTH input and output. If input is 180K tokens, max output is 20K regardless of the model's stated max output.

### Token Counting

You can count tokens before sending a request using the token counting endpoint:
```
POST /v1/messages/count_tokens
```

Same structure as a regular request (same model, system, messages, tools) but returns token count without generating a response. Useful for:
- Pre-checking whether a request will exceed limits
- Billing estimates
- Dynamic context management

### What Consumes Tokens

Every part of the API request counts:
- System prompt
- All message content (every turn in history)
- Tool definitions
- Images (significant: ~1,500 tokens per typical image)
- Cache breakpoints (the tokens being cached still count as input)

### Context Window Management Strategies

**Strategy 1: Sliding Window**
Keep only the last N messages. Simple but loses early context.

**Strategy 2: Summarization**
When approaching the limit, ask Claude to summarize earlier conversation segments. Replace the old messages with the summary. Preserves key information at a fraction of the token cost.

**Strategy 3: RAG (Retrieval Augmented Generation)**
Store documents externally. Retrieve only the relevant chunks for each query via semantic search. Dramatically reduces per-request token usage.

**Strategy 4: Structured State**
Extract key facts/state into a compact JSON summary after each turn. Inject the state summary at the top of each new request. More precise than full conversation history.

### The `context_window_exceeded` Error

When input exceeds the model's context window, you get a 400 error. Handling:
1. Check the error type for `context_window_exceeded`
2. Apply your chosen management strategy (summarize, truncate, retrieve)
3. Retry with the reduced context

### Extended Thinking and Context

When extended thinking is enabled, Claude's reasoning tokens also count toward the context. A request with `thinking.budget_tokens = 10000` can consume up to 10K additional tokens even before generating any visible output.

## Important Details

- 200K context is shared across all current models
- Output tokens also count against the total context window
- Token counting endpoint returns a count but does NOT generate a response
- Tool definitions count as input tokens every request (prompt caching helps here)
- `context_window_exceeded` is a 400 error type `invalid_request_error`

## Common Exam Traps

**Trap 1: Max output is independent of context usage.** False — if input uses 180K of 200K context, output is capped at 20K even if the model supports 64K output.

**Trap 2: Token counting incurs model charges.** Minimal cost (no generation), but the endpoint exists precisely to check before generating.

**Trap 3: Cache read tokens don't count against context.** False — cached tokens still count toward the context window. Caching saves money but NOT context space.

**Trap 4: Summarization always loses information.** Acceptable tradeoff — a good summary preserves key facts. The alternative (losing old context arbitrarily) is usually worse.

## Practice Tips

Know the context window sizes and that they are shared between input and output. Practice the summarization strategy — describe how you would implement it in code. Also understand when RAG is better than summarization (very large external corpora) vs. when summarization is better (continuous conversation state).
