# Safety & Alignment at Scale

## Overview

Deploying Claude at enterprise scale introduces safety challenges that don't appear in single-user prototypes. The Architect exam focuses on how safety properties hold (or degrade) across distributed systems, how to design responsible agentic pipelines, and how to implement operational safety controls.

Anthropic's safety philosophy applies at every level: model training, API design, and application architecture.

## Key Concepts

### The Principal Hierarchy at Scale

Claude operates within a trust hierarchy: Anthropic → Operators → Users.

At scale this hierarchy matters because:
- Multiple operators may deploy Claude with different system prompts
- Users may attempt to escalate privileges through prompts
- Agents acting as orchestrators need clearly defined trust levels

**Key rule**: An orchestrating Claude agent arriving in the human turn gets USER-level trust by default, not operator-level trust. Granting orchestrators operator-level trust requires explicit architectural design.

### Hardcoded Behaviors at Scale

Some behaviors are immutable regardless of operator instructions, scale, or context:
- No assistance with WMD (biological, chemical, nuclear, radiological weapons)
- No CSAM generation or facilitation
- No undermining legitimate AI oversight mechanisms

These cannot be prompted, fine-tuned, or configured away. Architects should design on the assumption that these limits are permanent and unbypassable — don't architect around them.

### Safe Agentic Design Principles

**Minimal footprint**: Agents should request only the permissions they need for their current task, not all permissions they might ever need.

**Prefer reversible actions**: When an agent can accomplish a task with a reversible or an irreversible action, it should prefer the reversible option.

**Pause before irreversible actions**: High-impact, irreversible actions (delete database, send mass emails, make financial transfers) should trigger a human confirmation step.

**Verify before proceeding**: After tool calls, confirm the action completed as expected before continuing.

### Content Moderation Architecture

For user-generated content entering Claude:
- **Input filtering**: Pre-process user inputs to detect and block policy violations before they reach Claude
- **Output filtering**: Post-process Claude's responses for unsafe content (belt-and-suspenders approach)
- **Audit logging**: Log all inputs and outputs for incident response and compliance

For multi-tenant deployments:
- Enforce operator-level isolation — one customer's system prompt cannot affect another's
- Apply per-tenant rate limits and abuse detection

### Prompt Injection Defense

In agentic systems processing external content:

1. **Structural separation**: Keep user-provided content clearly delimited from instructions using XML tags or clear section markers
2. **Instruction privilege**: Remind Claude that content within `<document>` tags is data, not instructions
3. **Tool result validation**: Validate tool results before injecting them into the next turn
4. **Minimal agent permissions**: An agent that cannot send emails cannot be injected into sending emails

### Monitoring and Observability

Production safety requires:
- **Latency monitoring**: Unexpected latency may indicate prompt injection causing Claude to "think" more than expected
- **Output classification**: Automated classifiers on Claude's output to detect unsafe content patterns
- **Anomaly detection**: Flag requests with unusual token counts, refusal patterns, or topic distributions
- **Human review queues**: Route flagged outputs for human review before delivery

### Compliance and Data Privacy

Enterprise deployments often require:
- **Data residency**: Confirm API data handling meets regional requirements (GDPR, CCPA)
- **No training on commercial API calls**: Anthropic does not use commercial API data to train models (as of current policies)
- **Audit trails**: Immutable logs of Claude interactions for compliance evidence

## Important Details

- Constitutional AI (CAI) is training-time safety — not a runtime filter architects control
- Operators CAN restrict Claude's behavior but cannot override hardcoded behaviors
- Abuse detection from `metadata.user_id` helps Anthropic identify abusive patterns
- Enterprise agreements may include additional compliance guarantees (SOC 2, HIPAA BAA)

## Common Exam Traps

**Trap 1: Operators can configure Claude to ignore all safety.** False. Operators can adjust softcoded behaviors; hardcoded behaviors are permanent.

**Trap 2: Another Claude agent has elevated trust.** False by default. Orchestrator Claude gets user-level trust in the human turn.

**Trap 3: CAI is a runtime content filter.** False. CAI is a training technique that shapes model weights. It's not a runtime system architects deploy.

**Trap 4: Monitoring is optional for production.** False for safety-critical deployments. Observability is required to detect degradation, injection, and misuse at scale.

## Practice Tips

Design a safety architecture for: a customer service chatbot processing user documents. Identify: where injection could occur, what trust levels are assigned, what monitoring is needed, and what irreversible actions require human confirmation. This design pattern is the architect exam's favorite question type.
