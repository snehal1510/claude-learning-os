# Prompt Caching

## Overview

Prompt caching is one of Claude's most impactful cost and latency optimization features. When you mark part of your prompt with a cache breakpoint, Anthropic stores the processed key-value (KV) representation of that prefix. Subsequent requests that share the same prefix hit the cache instead of reprocessing — dramatically reducing both input token cost and time-to-first-token.

For applications with large, repeated contexts (system prompts, documents, tool definitions), prompt caching can reduce input costs by up to 90%.

## Key Concepts

### How Caching Works

Caching is applied to the **prefix** of the prompt. You mark where the prefix ends using a `cache_control` breakpoint. On the first request, Anthropic processes the prefix and stores it. On subsequent requests with the same prefix, it's served from cache.

Cached tokens cost **10% of the normal input token price** — a 90% savings on those tokens.

### Cache Breakpoint Syntax

Add `cache_control` to a content block or the system parameter:

```json
{
  "system": [
    {
      "type": "text",
      "text": "You are a customer support agent. Here is our 50,000-word product manual: [content]",
      "cache_control": {"type": "ephemeral"}
    }
  ]
}
```

Only `{"type": "ephemeral"}` is currently supported.

### Where Breakpoints Can Be Placed

- **System prompt content blocks**: most common use case
- **Human turn content blocks**: e.g., a long document provided each turn
- **Tool definitions**: cache the entire tool definition array
- **Messages in multi-turn conversations**: cache earlier conversation history

### Cache TTL and Persistence

- **Minimum content size**: 1,024 tokens (Claude Haiku), 2,048 tokens (Sonnet/Opus) — content below the minimum is NOT cached even if breakpoints are set
- **TTL**: 5 minutes (standard caches expire after 5 minutes of inactivity)
- **Cache refresh**: Each cache hit resets the TTL — an active cache stays alive
- **Cache key**: the exact prefix bytes — any difference (even one character) creates a different cache entry

### Usage Tracking

The response `usage` field shows cache activity:
```json
"usage": {
  "input_tokens": 500,
  "output_tokens": 100,
  "cache_creation_input_tokens": 10000,
  "cache_read_input_tokens": 0
}
```

- `cache_creation_input_tokens`: tokens newly written to cache (first request — you pay for cache creation)
- `cache_read_input_tokens`: tokens served from cache (subsequent requests — you pay 10%)
- Cache creation costs 125% of base input price (slight overhead for first write)

### Multiple Breakpoints

You can have up to **4 cache breakpoints** per request. They are cumulative — the second breakpoint extends the cached prefix through its position.

## Important Details

- Cache creation has a 25% premium over base input price — the savings come on reads
- Minimum token thresholds: 1024 (Haiku), 2048 (Sonnet/Opus, Claude 3.7)
- TTL is 5 minutes; hits refresh TTL
- Up to 4 breakpoints per request
- Breakpoints are positional — they EXTEND the cached portion, not mark isolated sections
- Content must be exactly identical for a cache hit

## Common Exam Traps

**Trap 1: Cache creation is cheaper than normal input.** FALSE. Cache creation is 125% of base price. The savings come from reads at 10%.

**Trap 2: Caching works on small prompts.** No — below the minimum token threshold (1024/2048 tokens), the breakpoint is silently ignored.

**Trap 3: Any change invalidates the entire cache.** True — the cache key is the full prefix. Changing a character invalidates that cache entry.

**Trap 4: Cache TTL is per-request.** No — the TTL is 5 minutes of inactivity. Each cache HIT resets the timer.

## Practice Tips

For exam questions, focus on: when to use caching (large repeated context), what the minimum threshold is, how the cost calculation works (creation = 125%, reads = 10%), and what breaks a cache (any prefix change). Practice identifying the breakpoint placement that maximizes cache hits for a given conversation pattern.
