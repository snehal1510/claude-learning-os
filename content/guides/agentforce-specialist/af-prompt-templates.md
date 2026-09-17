# Prompt Templates

## Overview

Prompt Builder is Salesforce's tool for creating, managing, and testing AI prompt templates — reusable, parameterized prompts that power Agentforce actions, Einstein Copilot features, and Einstein field generation. Rather than hardcoding prompts inside Apex or Flow, Prompt Builder externalizes them as managed metadata that can be versioned, tested, and activated independently of code deployments.

A prompt template is essentially a structured instruction to the LLM, with dynamic placeholders (merge fields) that pull in real Salesforce data at runtime. When an Agentforce action uses a Flex template, the template is instantiated with the customer's actual record data — the case description, account history, or Data Cloud unified profile — and the completed prompt is sent to the LLM. This grounding in real data is what makes AI responses relevant and accurate rather than generic.

Understanding prompt templates is important not just for the exam, but for building production-quality AI features. The quality of your templates — how specifically they instruct the LLM, how well they use available data, how clearly they define the expected output — directly determines the quality of your Agentforce agent's responses.

## Key Concepts

### Template Types

**Flex Templates** are the most flexible type. They accept variable structure and are designed for use in Agentforce actions and scenarios where the output can be conversational or structured depending on context. Use Flex templates when building agent actions that need to reason about data and generate adaptive responses.

**Field Generation Templates** are purpose-built for generating text that populates a specific Salesforce record field. For example, a Field Generation template on the Case object might auto-populate the "Case Summary" field based on the case description and email thread. These are used by Einstein features like Auto-Fill Case Summary and custom Copilot actions that write to records.

### Merge Fields
Merge fields are how you inject Salesforce data into a prompt at runtime. In Prompt Builder, you define input resources (a Salesforce record, a related record, a Data Cloud unified profile) and reference their fields using syntax like `{!Record.Description}` or `{!Account.Name}`. The platform resolves these at runtime, replacing the placeholder with the actual field value before sending the prompt to the LLM.

### Grounding
Grounding means anchoring the LLM's response to specific, verifiable data from your Salesforce org. When a prompt includes the customer's actual case history, account details, and purchased products, the LLM generates a response based on those facts — not on its training knowledge alone. Grounding dramatically reduces hallucination (the LLM inventing plausible-sounding but false information) and makes responses specific to each customer.

### Template Activation
Templates exist in Draft or Active state. Only Active templates are available to Agentforce actions, Einstein features, and Flow. After building and testing a template, you must explicitly activate it. This gate prevents untested or work-in-progress templates from accidentally being used in production.

## How It Works

1. Open **Prompt Builder** (Setup → Prompt Builder → New).
2. Choose template type (Flex or Field Generation).
3. Define **Resources** — the Salesforce objects or Data Cloud profiles whose data you want to include.
4. Write the prompt body, inserting **merge fields** where you want dynamic data.
5. Use the **Preview panel** to enter a sample record ID and see the fully rendered prompt.
6. Test the output — click **Generate** in Preview to see what the LLM returns.
7. **Activate** the template when satisfied.
8. In Agent Builder, create an action that references this prompt template.

## Hands-On Implementation Notes

- Access Prompt Builder via **Setup → Prompt Builder**.
- When adding a resource, choose the object (e.g., Case) and optionally related objects (Account, Contact). Each resource is assigned a variable name used in merge fields.
- Insert merge fields using the **Insert Merge Field** button — this shows available fields based on your resources and inserts the correct syntax.
- The **Preview panel** is your primary testing tool: enter a real record ID, click Preview, and see the rendered prompt with actual data and the LLM's response.
- For Field Generation templates, specify the target object and field in the template configuration.

## Important Exam Details

- **Flex** = conversational/agent use, flexible output structure.
- **Field Generation** = generates text for a specific Salesforce record field.
- Merge field syntax: `{!ResourceName.FieldName}` (exact syntax may vary by version — know the concept).
- Templates must be **Activated** before use. Draft templates are invisible to Agentforce.
- **Grounding** = including real CRM/Data Cloud data in the prompt to anchor LLM responses.
- Templates are versioned metadata — changes create new versions; old versions are preserved.
- The **Preview panel** shows the rendered prompt with actual data before activation.
- Data Cloud can be used as a grounding resource if licensed (unified profile data in prompts).

## Common Mistakes & Exam Traps

- **Forgetting to activate**: Building a perfect template but leaving it in Draft means no Agentforce action can use it. Activation is a required, explicit step.
- **Confusing template types**: Using a Field Generation template where a Flex template is needed (or vice versa) will result in the template not appearing as an available action type in Agent Builder.
- **Vague LLM instructions**: A template that says "help the customer" gives the LLM too little guidance. Effective templates specify the exact output format, tone, length constraints, and any rules (e.g., "Do not mention pricing. Keep the response under 100 words.").
- **Missing merge fields**: Forgetting to include key data (e.g., the case description) means the LLM generates a generic response without the specific context it needs.
- **Grounding ≠ hallucination elimination**: Grounding significantly reduces hallucination but does not eliminate it entirely. Test templates with varied record data to catch edge cases.

## Official Documentation

- https://help.salesforce.com/s/articleView?id=ai.prompt_builder_about.htm
- https://help.salesforce.com/s/articleView?id=ai.prompt_builder_flex_template.htm
- https://help.salesforce.com/s/articleView?id=ai.prompt_builder_field_generation.htm
