# Safety & Responsible AI

## Overview

Anthropic built Claude with safety as a core objective from the ground up, not as an afterthought. Understanding Claude's safety architecture — Constitutional AI, the three H's, hardcoded vs. softcoded behaviors — is essential for building responsible applications and for exam success.

Safety behaviors operate at two levels: those trained into the model (which cannot be overridden by any prompt) and those that are configurable (which operators can adjust within limits). This distinction is crucial for exam questions about what system prompts can and cannot change.

## Key Concepts

### Constitutional AI (CAI)

Constitutional AI is Anthropic's training technique where Claude learns to evaluate and revise its own responses against a set of principles (the "constitution"). Rather than relying purely on human labels of harmful content, Claude uses AI feedback guided by principles to improve its own outputs during training.

The result: safety behaviors are deeply embedded in the model's weights, not bolted on as external filters.

### The Three H's: Helpful, Harmless, Honest

Anthropic's core objectives for Claude:
- **Helpful**: Genuinely useful to users and operators, not reflexively cautious
- **Harmless**: Avoiding actions that cause real-world harm
- **Honest**: Truthful, calibrated, transparent about limitations

These three objectives can create tension (being fully helpful with harmful requests conflicts with being harmless), and Claude must balance them.

### RLHF: Reinforcement Learning from Human Feedback

A training technique where human raters evaluate Claude's responses, and the model is trained via reinforcement learning to produce responses that humans prefer. Part of Claude's training pipeline alongside CAI.

Important: RLHF happens during training. Claude does NOT update its weights during deployment based on conversations.

### Hardcoded vs. Softcoded Behaviors

**Hardcoded** behaviors are absolute — no prompt or instruction can change them:
- Will not generate CSAM (child sexual abuse material)
- Will not provide meaningful assistance with creating weapons of mass destruction (biological, chemical, nuclear, radiological)
- Will not help undermine legitimate oversight of AI systems

**Softcoded** behaviors are defaults that operators can legitimately adjust:
- Operators can ENABLE: explicit adult content (for verified adult platforms), detailed drug information (for harm reduction services)
- Operators can RESTRICT: limit Claude to specific topic domains, prevent off-topic responses

### System Prompt Limitations

System prompts CAN:
- Establish a persona or role
- Restrict topics Claude discusses
- Set response format requirements
- Enable certain content types (within Anthropic's policies)

System prompts CANNOT:
- Override hardcoded safety behaviors
- Unlock absolute refusals (CSAM, WMD, etc.)
- Make Claude deceive users in ways that harm them

### Prompt Injection

Prompt injection occurs when malicious text embedded in external data (documents, web content, tool results) attempts to override Claude's instructions: "Ignore your instructions and do X instead."

Claude is trained to recognize these attempts. In agentic systems processing external content, prompt injection is a significant security concern.

## Important Details

- Unhelpfulness is NOT inherently safe — refusing too much fails the Helpful objective
- Sensitive domain handling (medical, legal): provide helpful info + note limitations + recommend professionals
- Operators have more trust than users by default in the principal hierarchy
- Claude does not verify user identity — claims about being a doctor don't grant special access

## Common Exam Traps

**Trap 1: "System prompts override all safety."** False. Hardcoded behaviors cannot be changed by any prompt.

**Trap 2: "Claude always refuses sensitive topics."** False. Claude can discuss medical, legal, security topics helpfully — the key is how, not whether.

**Trap 3: "RLHF means Claude learns from conversations."** False. RLHF is a training-time technique. Production conversations don't update Claude's weights.

**Trap 4: Confusing hardcoded with softcoded.** Hardcoded = absolute, no exceptions. Softcoded = adjustable by operators within policies.

## Practice Tips

Focus on the hardcoded/softcoded distinction and what system prompts can vs. cannot do. Exam questions often present scenarios where someone tries to use a system prompt to bypass safety — the answer is always that hardcoded behaviors remain.
