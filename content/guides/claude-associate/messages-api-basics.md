# Messages API Basics

## Overview

The Messages API is the primary interface for interacting with Claude. Every request follows the same structure: you provide a model, a maximum output length, and a conversation history. Claude responds with a message containing content, metadata, and usage statistics.

Understanding the request and response structure — particularly which parameters are required vs. optional, what stop_reason values mean, and how the usage field works — is essential for building reliable applications.

## Key Concepts

### Required Parameters

Only three parameters are required for every request:
1. `model` — the Claude model ID (e.g., `claude-sonnet-5`)
2. `max_tokens` — maximum output tokens (a ceiling, not a target)
3. `messages` — array of conversation turns

Everything else is optional: `system`, `temperature`, `top_p`, `top_k`, `stop_sequences`, `stream`, `tools`, `metadata`.

### Request Structure

```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 1024,
  "system": "You are a helpful assistant.",
  "messages": [
    {"role": "human", "content": "What is 2+2?"},
    {"role": "assistant", "content": "4"},
    {"role": "human", "content": "And 4+4?"}
  ]
}
```

### Response Structure

A successful response contains:
- `id` — unique message identifier
- `type` — always `"message"`
- `role` — always `"assistant"`
- `content` — array of content blocks (usually `[{"type": "text", "text": "..."}]`)
- `model` — the model that generated the response
- `stop_reason` — why generation stopped
- `stop_sequence` — which stop sequence was matched (if applicable)
- `usage` — token counts

### stop_reason Values

This is a high-frequency exam topic. Four possible values:
- `"end_turn"` — Claude naturally completed its response
- `"max_tokens"` — hit the output limit; response may be truncated
- `"stop_sequence"` — matched a string in stop_sequences
- `"tool_use"` — Claude wants to call a tool

If you receive `"max_tokens"`, consider increasing max_tokens or implementing continuation logic.

### usage Field

```json
"usage": {
  "input_tokens": 100,
  "output_tokens": 50,
  "cache_creation_input_tokens": 0,
  "cache_read_input_tokens": 0
}
```

The cache fields appear when prompt caching is active. You pay for actual output_tokens generated, not the max_tokens value.

### Temperature

Range: **0 to 1** (not 0-2 like some APIs). Default: **1.0**.
- Lower values → more deterministic, focused responses
- Higher values → more varied, creative responses
- Temperature 0 → near-deterministic (greedy decoding)

## Important Details

- `max_tokens` is billed based on actual output_tokens, not the max_tokens value
- The `content` field is an array even when there's only one text block
- `role` in responses is ALWAYS `"assistant"` — regardless of model
- `type` in responses is ALWAYS `"message"`
- stop_sequences: array of strings, up to 8191 characters each, up to 8,191 total

## Common Exam Traps

**Trap 1: Thinking max_tokens is the exact output length.** It's a ceiling. Shorter responses are normal and common.

**Trap 2: Four stop_reason values.** Know all four: end_turn, max_tokens, stop_sequence, tool_use. Exam questions often test whether you know what each means.

**Trap 3: Temperature range.** Claude's temperature is 0 to 1, not 0 to 2. Setting 1.5 would be out of range.

**Trap 4: The usage field during caching.** When prompt caching is active, usage includes extra fields for cache_creation and cache_read tokens. Standard usage just has input_tokens and output_tokens.

## Practice Tips

Memorize the three required parameters (model, max_tokens, messages) and four stop_reason values — these appear repeatedly in exam questions. Also practice reading a response object and identifying what each field means.
