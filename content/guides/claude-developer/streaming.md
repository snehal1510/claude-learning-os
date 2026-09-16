# Streaming Responses

## Overview

Streaming allows you to process Claude's response as it is generated, token by token, rather than waiting for the complete response. This dramatically improves perceived latency — users see text appearing in real time instead of waiting for a potentially long pause before a wall of text arrives.

The Messages API supports Server-Sent Events (SSE) streaming. Understanding the event sequence, delta types, and how to reconstruct a complete response from a stream is tested in the Developer exam.

## Key Concepts

### Enabling Streaming

Add `"stream": true` to your request:
```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 1024,
  "stream": true,
  "messages": [...]
}
```

The response changes from a JSON object to a series of SSE events over the same HTTP connection.

### SSE Event Format

Each event has a `event:` type line, followed by a `data:` JSON payload line:
```
event: message_start
data: {"type":"message_start","message":{...}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Hello"}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"output_tokens":5}}

event: message_stop
data: {"type":"message_stop"}
```

### Event Sequence (in order)

1. **`message_start`** — contains the initial message object with empty content
2. **`content_block_start`** — starts a new content block at index N
3. **`content_block_delta`** — incremental delta for the block (repeats many times)
4. **`content_block_stop`** — signals the block is complete
5. Steps 2-4 repeat for each content block (text, tool_use, etc.)
6. **`message_delta`** — final stop_reason and output token count
7. **`message_stop`** — stream is fully complete

### Delta Types

Two delta types in `content_block_delta`:
- **`text_delta`**: `{"type": "text_delta", "text": "chunk of text"}`
- **`input_json_delta`**: `{"type": "input_json_delta", "partial_json": "{\"key\": \"val"}` — used when Claude is streaming a tool call's input JSON

### Reconstructing the Full Response

Accumulate text_delta chunks by concatenating their `text` values in order. For tool_use blocks, accumulate input_json_delta `partial_json` values and parse the completed JSON once `content_block_stop` arrives.

### Streaming with Tool Use

When Claude calls a tool mid-stream:
- `content_block_start` with `content_block.type = "tool_use"` begins the tool call
- `content_block_delta` events carry `input_json_delta` chunks
- `content_block_stop` signals tool input is complete
- `message_delta` carries `stop_reason: "tool_use"`

You must buffer the partial JSON, parse it after stop, then execute the tool.

## Important Details

- `stream: true` changes the HTTP response to `text/event-stream` content type
- The final usage stats appear in the `message_delta` event, NOT `message_stop`
- Each `content_block_delta` applies to the block at the specified `index`
- `ping` events may appear — ignore them (keep-alive packets)
- Errors mid-stream arrive as `error` events, not HTTP error codes

## Common Exam Traps

**Trap 1: Confusing message_stop and message_delta.** Token usage is in `message_delta`, not `message_stop`.

**Trap 2: Partial JSON in tool streaming.** You CANNOT parse tool input as it arrives. Wait for `content_block_stop` before parsing — it's deliberately split across chunks.

**Trap 3: The event sequence.** Know the order: message_start → content_block_start → content_block_delta (many) → content_block_stop → message_delta → message_stop.

**Trap 4: Errors mid-stream.** A streaming error arrives as an `error` SSE event, not as a non-200 HTTP status code. Check for it.

## Practice Tips

Trace through the full event sequence for a simple text response, then for a tool call response. The exam may show you partial event sequences and ask which event comes next, or what field contains the token count.
