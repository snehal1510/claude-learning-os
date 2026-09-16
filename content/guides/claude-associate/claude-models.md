# Claude Model Family

## Overview

Anthropic organizes Claude models into three tiers that trade off capability, speed, and cost. Understanding which model to choose for a given task is one of the most impactful architectural decisions you can make — using the wrong tier means either overpaying for simple tasks or underperforming on complex ones.

The three tiers are **Haiku** (fastest, cheapest), **Sonnet** (balanced), and **Opus** (most capable, most expensive). Each generation (Claude 3, Claude 4, Claude 5) brings improvements across all tiers while maintaining the same tiered structure.

All current Claude models share a 200,000 token context window — large enough to fit entire books, extensive codebases, or large document collections in a single request.

## Key Concepts

### The Three-Tier Model

**Haiku** is engineered for latency-sensitive, high-volume, lower-complexity tasks. Think: classification, routing, simple extraction, lightweight chat, and any task where you're calling the API thousands of times and quality-per-call doesn't need to be exceptional.

**Sonnet** is the balanced middle tier — good capability at a reasonable price. Most general-purpose applications, customer-facing chatbots, and moderate-complexity tasks start here.

**Opus** is the frontier model — Anthropic's most capable. It excels at complex reasoning, nuanced analysis, creative synthesis, and tasks where errors are expensive. Use it when capability matters more than cost.

### Model IDs and Versioning

Claude model IDs follow this pattern: `claude-{model-name}-{generation}-{date}`

Example: `claude-haiku-4-5-20251001`

- The date (YYYYMMDD) identifies the exact model snapshot
- Using the full versioned ID in production ensures behavioral consistency
- Aliases like `claude-sonnet-5` point to the latest version of a tier and may change — convenient for development, but risky for production

The latest models as of 2025:
- **Haiku**: `claude-haiku-4-5-20251001`
- **Sonnet**: `claude-sonnet-5`
- **Opus**: `claude-opus-5`

### Context Window and Output Limits

All current Claude models: **200,000 input tokens** context window.

Max output tokens vary by model:
- Haiku 4.5 and Sonnet: **8,192 output tokens**
- Opus 5: approximately **32,768 output tokens**

Note: 200K is the INPUT limit. The output limit is much smaller and separate.

## Important Details

- **200K context** ≈ approximately 150,000 words ≈ 500+ pages of text
- The date in a model ID is the **release date of that snapshot**, not the knowledge cutoff
- Aliases auto-update; versioned IDs are stable — always pin in production
- Haiku minimum cache threshold: 1,024 tokens; Sonnet/Opus: 2,048 tokens

## Common Exam Traps

**Trap 1: Confusing context window with output limit.** 200K is INPUT context. Max output is 8,192 (Haiku/Sonnet) or ~32K (Opus). These are very different numbers.

**Trap 2: Thinking aliases are stable.** `claude-sonnet-5` may point to different snapshots over time. Only versioned IDs like `claude-sonnet-5-20251022` are guaranteed stable.

**Trap 3: Assuming all models have identical capabilities.** The tiers exist for a reason. Haiku makes more reasoning errors than Opus on complex tasks. Choose based on task complexity, not just cost.

**Trap 4: The model ID date is not the knowledge cutoff.** Knowledge cutoffs are documented separately. The date in the ID identifies the model snapshot release date.

## Practice Tips

When a question asks which model to use, look for these signals:
- "High volume" + "classification/routing/simple" → **Haiku**
- "Balance" + "general purpose" + "customer-facing" → **Sonnet**
- "Complex reasoning" + "nuanced analysis" + "accuracy critical" → **Opus**
- "Production stability" + "consistent behavior" → **versioned ID**, never an alias

Practice identifying the right tier from task descriptions — this is a high-frequency question type.
