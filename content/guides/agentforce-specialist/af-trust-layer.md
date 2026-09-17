# Einstein Trust Layer

## Overview

The Einstein Trust Layer is Salesforce's AI governance architecture that sits between Agentforce (and all Einstein AI features) and the underlying LLM providers. Its purpose is to make enterprise AI adoption safe, compliant, and auditable — addressing the core concerns that prevent organizations in regulated industries from deploying AI: data privacy, harmful content, and auditability.

Every LLM call made by Agentforce, Einstein Copilot, or Prompt Builder flows through the Einstein Trust Layer's LLM Gateway. This gateway is the enforcement point where all Trust Layer protections are applied consistently, regardless of which underlying LLM provider (Azure OpenAI, Anthropic, etc.) processes the request. This centralized architecture means governance is guaranteed by the platform, not dependent on each team correctly implementing their own safeguards.

For the Agentforce Specialist exam, you need to know each Trust Layer component, what it protects against, and when it applies. Many exam questions describe a compliance scenario and ask which Trust Layer feature addresses it.

## Key Concepts

### Data Masking
Before a prompt is sent to the LLM, the Trust Layer scans it for sensitive PII — Social Security Numbers, credit card numbers, phone numbers, and other regulated data types. Detected values are replaced with placeholder tokens (e.g., `[MASKED_SSN]`) so the LLM processes the prompt without ever seeing the actual sensitive data. After the LLM responds, the masks are not reversed in the output either — the response contains the placeholder, not the real value.

### Toxicity Detection
The Trust Layer screens both incoming user messages and outgoing LLM responses for harmful content: hate speech, violence, explicit content, and other policy-violating material. Flagged content is blocked before it reaches the LLM (for inputs) or before it is delivered to the user (for outputs). This dual screening — input and output — protects against both adversarial users trying to elicit harmful responses and model drift where the LLM generates unexpected content.

### Zero Data Retention
Salesforce has contractual agreements with all its LLM providers that prohibit storing, logging, or using customer data sent through the LLM Gateway for model training or any other purpose. The LLM provider processes the prompt and returns the response, then discards all data. This zero data retention guarantee is critical for organizations that must comply with GDPR, CCPA, HIPAA, and other data protection regulations.

### Audit Trail
Every LLM interaction is logged in an immutable audit trail: which user or agent triggered the call, the timestamp, the masked prompt, and the response. This log is accessible to Salesforce admins and can be exported for compliance reporting. For regulated industries (financial services, healthcare, public sector), the audit trail is often a prerequisite for AI deployment approval.

### Grounding
Grounding is the practice of including relevant, verifiable data from Salesforce (CRM records, Data Cloud unified profiles, knowledge articles) in the prompt. Grounding keeps LLM responses anchored to real information, reducing hallucination. While this is also a Prompt Template concept, grounding is a Trust Layer principle — it is how the platform ensures AI responses are based on your data, not the model's imagination.

## How It Works

```
User message → Agentforce → Prompt construction
    → Trust Layer (Data Masking → Toxicity Check → Audit Log entry)
    → LLM Gateway → LLM Provider (processes, discards data per ZDR)
    → Response → Trust Layer (Toxicity Check → Audit Log response)
    → Agentforce → User
```

## Hands-On Implementation Notes

- Trust Layer is **on by default** for all Einstein AI features — there is no "enable" step for the core protections.
- View LLM audit logs: Setup → Einstein Trust Layer → Audit Trail (exact navigation may vary by org).
- Data masking is automatic; you cannot disable it for specific fields. To customize masking sensitivity, contact Salesforce support.
- Toxicity detection sensitivity can be configured in Trust Layer settings — admins can adjust thresholds for different content categories.
- Zero data retention is a platform agreement, not an org-level configuration — it is always active.

## Important Exam Details

- **5 core components**: Data Masking, Toxicity Detection, Zero Data Retention, Audit Trail, Grounding.
- **Zero data retention** = LLM provider cannot train on your data — it's a contractual guarantee, not a technical setting.
- **Data masking** applies BEFORE the prompt reaches the LLM — PII is replaced, not encrypted.
- **Toxicity detection** applies to BOTH input and output.
- **Audit Trail** is immutable — all LLM calls are logged, not just problematic ones.
- The **LLM Gateway** is the enforcement point — all Einstein LLM calls go through it.
- Trust Layer works regardless of which underlying LLM provider is used.
- GDPR/CCPA compliance is enabled by zero data retention + audit trail + data masking.

## Common Mistakes & Exam Traps

- **Zero data retention ≠ Salesforce doesn't store data**: Salesforce maintains its own audit trail. Zero data retention is about the LLM provider (Azure, Anthropic, etc.) not storing or training on the data.
- **Data masking ≠ encryption**: Encryption protects data in transit from eavesdropping but the LLM still receives plaintext. Masking removes the sensitive value entirely — the LLM never sees it.
- **Audit trail for retroactive review ≠ real-time protection**: The audit trail enables compliance review after the fact. Toxicity detection is the real-time protection. Don't confuse their roles.
- **Grounding ≠ 100% hallucination prevention**: Grounding reduces hallucination significantly but doesn't eliminate it. LLMs can still generate inaccurate summaries of real data.
- **Trust Layer is always on**: You don't enable Trust Layer per agent or per action — it applies universally to all Einstein LLM calls in the org.

## Official Documentation

- https://help.salesforce.com/s/articleView?id=ai.einstein_trust_layer_overview.htm
- https://help.salesforce.com/s/articleView?id=ai.einstein_trust_layer_data_masking.htm
- https://help.salesforce.com/s/articleView?id=ai.einstein_trust_layer_toxicity.htm
