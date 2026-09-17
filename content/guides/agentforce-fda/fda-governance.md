# Governance & Trust

## Overview

AI governance is the framework of policies, roles, and controls that ensure an Agentforce implementation operates safely, ethically, and in compliance with applicable regulations. For FDA candidates, governance knowledge is not optional — enterprise clients increasingly require consultants to advise on AI governance as part of the delivery engagement, and regulators (GDPR, CCPA, sector-specific rules) are actively scrutinising AI in customer interactions.

The Einstein Trust Layer is Salesforce's architectural response to enterprise governance requirements. It provides the technical controls — data masking, zero data retention, toxicity detection, audit logging — that make it possible for regulated industries to adopt Agentforce. Understanding what each component does, and why it exists, is essential both for the FDA exam and for advising clients on compliance.

Governance is not purely technical. It also encompasses organisational controls: who has authority to change the agent's scope, who reviews the audit logs, what happens when the agent makes a mistake, and how the organisation demonstrates accountability to regulators. FDA candidates must understand both layers.

## Key Concepts

### Einstein Trust Layer Components

**Data Masking**: Before customer data is sent to the LLM, the Einstein Trust Layer scans for PII fields (social security numbers, credit card numbers, medical record IDs, email addresses depending on configuration) and replaces them with anonymised tokens. The LLM processes the masked version. Masking is a preventive control — it stops PII from ever reaching the LLM provider.

**Zero Data Retention (ZDR)**: Salesforce has contractual agreements with its LLM providers (including Azure OpenAI) that customer data sent for processing is not stored after the request completes and is never used to train the underlying models. ZDR is the answer to the question: "How do I know my customer data won't train someone else's AI?"

**Toxicity Detection**: The Trust Layer screens both inputs (customer messages) and outputs (agent responses) for harmful, offensive, or dangerous content. Outputs that fail toxicity screening are blocked before reaching the customer. This prevents the agent from being manipulated into producing harmful content.

**Audit Trail**: Every LLM interaction is logged — what was sent, what was received, which model was used, and when. The audit trail is the basis for regulatory compliance (GDPR right to explanation, sector-specific AI audit requirements) and for internal incident investigation.

**Grounding**: Grounding anchors the agent's responses to verified Salesforce data rather than the LLM's training data. A grounded agent answers "What is your order status?" by retrieving the actual order record, not by generating a plausible-sounding but potentially hallucinated answer.

### Acceptable Use Policy
Every Agentforce deployment should be governed by a written acceptable use policy defining: what the agent is authorised to do autonomously, what requires human approval before action, and what is strictly out of scope. This policy is implemented technically through Topic instructions and Action guardrails, and organisationally through governance review processes.

### Human Oversight Checkpoints
Not all agent decisions should be fully autonomous. High-stakes actions — processing refunds above a threshold, cancelling contracts, escalating complaints — should have human-in-the-loop checkpoints where the agent presents a recommendation and waits for human approval before executing.

## How It Works / The Process

1. **Policy definition** — Define acceptable use policy, data handling policy, and escalation policy during the Design phase.
2. **Trust Layer configuration** — Configure data masking rules, enable audit logging, set toxicity detection sensitivity.
3. **Role assignment** — Designate an AI Governance owner (typically a compliance or IT risk manager) responsible for ongoing oversight.
4. **Incident response planning** — Document the procedure for responding to agent errors: escalation path, investigation using audit logs, remediation steps.
5. **Monitoring setup** — Configure dashboards to surface audit log anomalies, containment rate drops, and toxicity detection events.
6. **Periodic review** — Schedule quarterly governance reviews: audit log sampling, acceptable use policy refresh, regulatory update assessment.

## Hands-On / Practical Notes

- **GDPR Article 22** (automated decision-making) requires organisations to be able to explain decisions made by automated systems. The **audit trail** is the technical foundation for this. Ensure audit logging is enabled before go-live in any EU-data deployment.
- **Data masking scope**: Work with the client's data protection officer to identify which fields require masking. Salesforce applies default PII detection, but custom fields with sensitive data need explicit configuration.
- **ZDR is a contractual guarantee**, not just a Salesforce claim. Clients in regulated industries should request confirmation of the ZDR agreement in writing as part of their vendor risk assessment.
- **Incident classification**: Agree a severity matrix before go-live. P1 incidents (harmful responses) require immediate agent deactivation. P2 (wrong answers) require urgent investigation. Clear classification prevents overreaction to minor issues and underreaction to serious ones.

## Important FDA Exam Details

- **Zero data retention** = LLM provider does not store or train on customer data (contractual guarantee)
- **Data masking** = PII replaced with tokens *before* reaching the LLM (preventive control)
- **Toxicity detection** = screens inputs AND outputs for harmful content
- **Audit trail** = every LLM interaction logged; required for GDPR right to explanation
- **Grounding** = reduces hallucination by anchoring responses to Salesforce data
- GDPR Article 22 relevance: right to explanation of automated decisions → requires **audit logging**
- P1 incident definition: **harmful response** → immediate deactivation and investigation

## Common Mistakes & Exam Traps

- **Confusing data masking and ZDR**: Masking prevents PII reaching the LLM during processing; ZDR prevents the LLM provider storing data after processing. They address different risks and both are required.
- **Thinking grounding replaces masking**: Grounding reduces hallucination but does not protect PII. Grounded data still passes through the LLM and needs masking.
- **Assuming ZDR is optional**: For enterprise and regulated clients, ZDR is a non-negotiable requirement, not a nice-to-have.
- **Treating governance as post-implementation**: Governance policies must be defined before build begins, not added as an afterthought after go-live.

## Official Documentation

- Einstein Trust Layer: https://help.salesforce.com/s/articleView?id=ai.einstein_trust_layer_overview.htm
- Agentforce security: https://help.salesforce.com/s/articleView?id=ai.agentforce_security.htm
- FDA partner resources: https://partners.salesforce.com
