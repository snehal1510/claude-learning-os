# Tool Use & Function Calling

## Overview

Tool use (also called function calling) is one of Claude's most powerful capabilities. It allows Claude to interact with external systems — databases, APIs, calculators, file systems — by requesting that your application execute specific functions and return results. The agentic loop that drives multi-step autonomous tasks is built on tool use.

Understanding the full tool use flow — definition, invocation, result handling, parallel calls, error signaling — is critical for the Developer certification exam.

## Key Concepts

### Tool Definition Structure

```json
{
  "name": "get_weather",
  "description": "Returns current weather for a given city. Use when the user asks about current weather conditions.",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "The city name"
      }
    },
    "required": ["city"]
  }
}
```

Three required fields: `name`, `description`, `input_schema` (JSON Schema).

The description is critically important — Claude uses it to decide WHEN to call this tool.

### The Tool Use Flow

1. **Define tools** in the request's `tools` array
2. **Claude decides** to use a tool → returns `stop_reason: "tool_use"` with a `tool_use` content block
3. **Your code executes** the tool with the provided `input`
4. **Return results**: append the assistant's message (with tool_use block), then add a human message with a `tool_result` content block using the matching `tool_use_id`
5. **Send to Claude again** — it continues reasoning with the result

### tool_use Block Structure

When Claude calls a tool:
```json
{
  "type": "tool_use",
  "id": "toolu_01AbCdEfGh",
  "name": "get_weather",
  "input": {"city": "London"}
}
```

### tool_result Block Structure

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01AbCdEfGh",
  "content": "London: 18°C, partly cloudy"
}
```

For errors: add `"is_error": true` to the tool_result.

### tool_choice Options

- `{"type": "auto"}` — Claude decides (default)
- `{"type": "any"}` — Claude must use at least one tool
- `{"type": "tool", "name": "get_weather"}` — forces a specific tool
- `{"type": "none"}` — Claude must NOT use any tools

### Parallel Tool Use

Claude can call multiple tools in one response (multiple `tool_use` blocks). You must execute ALL of them and return ALL results before Claude can continue.

## Important Details

- Tool definitions count as **input tokens** — factor this into cost estimates
- The `id` in tool_use must exactly match `tool_use_id` in tool_result
- `is_error: true` in tool_result tells Claude the tool failed — it can then adapt
- Parallel tool_use blocks indicate Claude wants concurrent execution, not alternatives
- `disable_parallel_tool_use` beta parameter forces one-at-a-time tool calls

## Common Exam Traps

**Trap 1: Sending only some parallel tool results.** You must return results for ALL tool_use blocks Claude returned. Partial results leave the conversation in a broken state.

**Trap 2: Forgetting to append the assistant's tool_use message before adding the tool_result.** The messages array must include the full assistant turn first.

**Trap 3: Confusing "any" and "auto".** `any` forces at least one tool. `auto` lets Claude decide. `none` prevents all tools.

**Trap 4: Thinking tool_use is an error.** `stop_reason: "tool_use"` is a normal, expected response indicating Claude wants to call a tool. It's not an error state.

## Practice Tips

Draw the full tool use message sequence on paper: [human] → [assistant with tool_use] → [human with tool_result] → [assistant with final answer]. This sequence is tested frequently. Practice tracing through a multi-step tool call.
