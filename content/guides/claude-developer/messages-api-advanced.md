# Messages API — Advanced

## Overview

Building beyond basic requests requires mastery of multi-turn conversation management, content block types, metadata handling, and error response patterns. The Messages API supports rich content types (text, images, tool_use, tool_result, document) and provides a layered error system for robust production applications.

This guide covers the advanced API features that distinguish a production integration from a prototype.

## Key Concepts

### Content Block Types

All messages carry a `content` array. Each block has a `type`. Supported types:

| Type | Used by | Purpose |
|------|---------|---------|
| `text` | Both | Plain or formatted text |
| `image` | Human turns | Inline base64 or URL image |
| `tool_use` | Assistant turns | Tool call request |
| `tool_result` | Human turns | Tool execution result |
| `document` | Human turns | PDFs, text files via base64 |

Mixed content example (text + image in one human turn):
```json
{
  "role": "human",
  "content": [
    {"type": "text", "text": "What is in this image?"},
    {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": "..."}}
  ]
}
```

### Vision Capabilities

Claude supports images in human turns. Two delivery methods:
- **Base64**: `"source": {"type": "base64", "media_type": "image/jpeg", "data": "<b64>"}`
- **URL**: `"source": {"type": "url", "url": "https://..."}` (model fetches from URL)

Supported formats: JPEG, PNG, GIF, WebP.
Max image size: 5 MB per image.
Images count as tokens (~1,500 tokens for a typical photo, up to ~2,300 for max size).

### The Metadata Field

The optional `metadata` object lets you attach `user_id` for safety purposes:
```json
"metadata": {"user_id": "user_abc123"}
```

Anthropic recommends sending user_id. It helps with abuse detection and trust scoring. It does NOT affect Claude's responses.

### Error Codes

HTTP status codes and their meanings:

| Code | Type | Common Cause |
|------|------|-------------|
| 400 | `invalid_request_error` | Malformed JSON, wrong role sequence |
| 401 | `authentication_error` | Bad API key |
| 403 | `permission_error` | Key lacks access to the feature |
| 404 | `not_found_error` | Wrong model ID |
| 429 | `rate_limit_error` | Exceeded rate limit |
| 500 | `api_error` | Anthropic server error |
| 529 | `overloaded_error` | Anthropic is overloaded |

Error response structure:
```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "messages: roles must alternate..."
  }
}
```

### Rate Limits

Two dimensions: **RPM** (requests per minute) and **TPIM** (tokens per input per minute).

Retry strategy: exponential backoff with jitter. Never retry immediately on 429.

### Request Timeout

There's no hard API timeout, but long requests can fail. For long documents, use streaming to avoid connection drops — the stream keeps the connection alive as tokens arrive.

## Important Details

- Role alternation is strictly enforced — consecutive same-role messages return 400
- Image URLs must be publicly accessible at request time (model fetches at inference time)
- `user_id` in metadata is for safety/tracking, not for authentication
- `api_error` (500) is retryable; `invalid_request_error` (400) is not
- `overloaded_error` (529) is retryable with backoff

## Common Exam Traps

**Trap 1: Using "user" instead of "human".** Role must be `"human"`, not `"user"`. Returns 400.

**Trap 2: Treating 500 and 400 the same.** 500 = server issue, retry. 400 = your request is wrong, fix before retrying.

**Trap 3: Image size limit.** 5 MB per image is the limit. Also know that images add significant token cost.

**Trap 4: metadata.user_id is not authentication.** It's a hint for safety purposes only.

## Practice Tips

Exam questions on advanced API topics often test error code mapping and content block types. Practice: given an error description, identify the HTTP code. Given a use case (vision, tool, document), identify the correct content block type.
