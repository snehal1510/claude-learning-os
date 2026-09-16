# Prompting Fundamentals

## Overview

Effective prompting is the foundation of getting good results from Claude. The Messages API uses a human/assistant turn structure, and understanding how to structure your instructions, use examples, and format content directly determines response quality. Poor prompting is responsible for most quality issues developers encounter — not model limitations.

Anthropic publishes extensive prompt engineering guidance that reflects empirical testing. The key insight: Claude responds to clear, specific, well-structured prompts the same way a skilled human would respond to clear instructions. Vague, ambiguous, or poorly-ordered prompts produce variable or incorrect results.

## Key Concepts

### Human/Assistant Turn Structure

The `messages` array alternates between `role: "human"` and `role: "assistant"` turns. Rules:
- **Always start with human**: the first message must have `role: "human"`
- **Strict alternation**: human, assistant, human, assistant... No consecutive same-role turns
- **Note**: The Anthropic API uses `"human"` (not `"user"` like some other APIs)
- The system prompt goes in the top-level `system` parameter, not in the messages array

### Instructions Before Content

Place instructions **before** the content they apply to. This mirrors natural reading order and ensures Claude understands the task before processing the material.

**Wrong**: `[100-page document] \n\n Now summarize this.`
**Right**: `Summarize the following document in 3 bullet points:\n\n[100-page document]`

### XML Tags for Structure

Claude is trained to recognize and use XML-like tags for structure. Use them to separate instructions from content, mark examples, and identify different document sections:

```
<instructions>
  Extract all dates from the following text.
</instructions>

<document>
  The meeting was scheduled for March 15...
</document>
```

### Few-Shot Examples

Providing examples of the desired input-output format is the most reliable way to get consistent formatting. One well-crafted example often beats a paragraph of instructions.

### Chain-of-Thought Prompting

For reasoning tasks, ask Claude to "think step by step" or "show its work." This significantly improves accuracy on math, logic, and multi-step reasoning by allowing internal reasoning to emerge before the final answer.

### Role Prompting

System prompts establish Claude's persona: `"You are an expert data analyst..."`. This shapes vocabulary, depth, and domain focus without giving Claude actual capabilities it doesn't have.

### Prefilling the Assistant Turn

You can start Claude's response by adding a partial assistant message at the end of the messages array. For JSON output:

```json
{"role": "human", "content": "Extract entities as JSON."},
{"role": "assistant", "content": "{"}
```

This steers Claude to continue from `{` — producing valid JSON from the start.

## Important Details

- Temperature range: 0 to 1 (default: 1.0). Lower = more deterministic
- Instructions at the start of a long document outperform instructions at the end
- XML tags don't need to be standard HTML — `<document>`, `<example>`, `<task>` all work
- The system prompt is separate from the messages array (use the `system` parameter)
- System prompts are NOT shown to end users by default

## Common Exam Traps

**Trap 1: Using "user" instead of "human" for role names.** The Anthropic API uses `"human"`, not `"user"`. This causes validation errors.

**Trap 2: Thinking the system prompt goes in the messages array.** The system is a separate top-level parameter. A `role: "system"` message in the messages array is not valid.

**Trap 3: Instructions at the end.** Putting instructions after the content (especially long content) significantly degrades performance. Instructions always come first.

**Trap 4: Confusing temperature with top_k/top_p.** Temperature range is 0-1. Setting temperature=0 doesn't guarantee completely deterministic outputs — it makes them near-deterministic.

## Practice Tips

Exam questions test whether you know the CORRECT technique, not just that a technique exists:
- "Consistent format" → few-shot examples
- "Step-by-step reasoning" → chain-of-thought
- "Structure complex prompts" → XML tags
- "Start with a specific output" → prefill the assistant turn
- "Establish context/persona" → system prompt (not user message)
