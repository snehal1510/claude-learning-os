# Agent Actions

## Overview

Actions are the capabilities an Agentforce agent can invoke to actually do things — retrieve data, update records, send emails, call external APIs, or trigger business processes. Without actions, an agent can only converse; with well-designed actions, it can resolve cases, create records, integrate with external systems, and complete complex multi-step workflows autonomously.

Actions are configured at the topic level: you specify which actions are available within each topic, and the LLM decides which action(s) to call based on the user's request and the action's description. This means action descriptions are critical — the LLM reads them to understand what each action does and when to use it. A poorly described action will be ignored or misused.

Salesforce provides multiple action types to cover different integration and automation patterns. Choosing the right action type for each scenario is a key exam topic and a real-world architectural decision.

## Key Concepts

### Standard Actions
Salesforce ships with pre-built standard actions that cover the most common service and sales tasks. Key standard actions include:
- **Query Records** — retrieves Salesforce records matching specified criteria
- **Draft or Send Email** — generates and optionally sends an email
- **Summarize Record** — produces an AI-generated summary of a record
- **Create Record / Update Record** — performs DML on Salesforce objects
- **Transfer to Agent** — hands off the conversation to a human service agent

### Apex Actions (@InvocableMethod)
Custom logic written in Apex can be exposed as Agentforce actions by annotating the method with `@InvocableMethod`. Input and output parameters are defined using `@InvocableVariable` on properties of inner request/response classes. This allows virtually any server-side logic — complex calculations, multi-step data operations, external callouts via Named Credentials — to be made available as an agent action.

### Flow Actions
**Autolaunched Flows** (both record-triggered and schedulable) can be invoked as Agentforce actions. They execute server-side without user interaction, can perform DML, call Apex, and return output variables. **Screen Flows are NOT supported** — they require rendering UI in a browser, which an autonomous agent cannot do. This is one of the most frequently tested distinctions.

### MuleSoft API Actions
For organizations using MuleSoft Anypoint Platform, Agentforce can invoke MuleSoft APIs as actions. This enables integration with any external system that MuleSoft connects to, without writing custom Apex.

### External Service Actions
Agentforce can call REST APIs registered in Salesforce as External Services (using OpenAPI specs). This is a low-code option for connecting external APIs without Apex.

## How It Works

1. Admin configures an action (standard, Apex, Flow, MuleSoft, or External Service) and writes a description.
2. Admin adds the action to one or more topics in Agent Builder.
3. At runtime, when a user message matches a topic, the LLM reads the user's request + the descriptions of all available actions in that topic.
4. The LLM selects the most appropriate action(s) and determines the input values.
5. Salesforce executes the action (calls Apex, runs the Flow, makes the API call, etc.).
6. The action's output is returned to the LLM, which incorporates it into the response.
7. Steps 4-6 can repeat (chaining) to complete multi-step tasks.

## Hands-On Implementation Notes

- **Standard actions**: Agent Builder → Topics → [Topic] → Actions → Add from Standard. Browse the catalog and add what you need.
- **Apex actions**: Create an Apex class with `@InvocableMethod`. In Agent Builder, find it under "Apex" in the action picker. Write a clear description and label — the LLM uses these for selection.
- **Flow actions**: Create an Autolaunched Flow (not Screen Flow) with Input and Output variables. In Agent Builder, add it as a Flow action from the topic.
- **External Service actions**: Setup → External Services → register the API's OpenAPI spec → the operations become available as actions in Agent Builder.
- **Action descriptions matter**: Click any action in Agent Builder to edit its description. Write it as a clear explanation of what the action does and when to use it, e.g., "Retrieves the status and estimated delivery date of an order given the order number."

## Important Exam Details

- **Screen Flows are NOT supported** for autonomous Agentforce agents. Autolaunched Flows only.
- **@InvocableMethod** is the required annotation for Apex actions.
- **@InvocableVariable** defines typed input/output parameters for Apex actions.
- Standard actions are pre-built and require no code.
- MuleSoft actions require Anypoint Platform; External Service actions require an OpenAPI spec.
- Actions are added **per topic** — an action in Topic A is not automatically available in Topic B.
- The LLM selects actions based on **action description** — description quality directly affects behavior.
- Multiple actions can be chained in a single conversation turn.

## Common Mistakes & Exam Traps

- **Screen Flow confusion**: This is the #1 exam trap for actions. Screen Flows look like they'd work (they're visual and rich) but they explicitly require human UI interaction, which an autonomous agent cannot provide. Always choose Autolaunched Flow.
- **Missing @InvocableMethod**: An Apex method without this annotation is invisible to Agentforce. No annotation = no action.
- **Poor action descriptions**: An action described as "runs the process" gives the LLM nothing to work with. Descriptions should be specific and explain inputs, outputs, and use cases.
- **Actions added to wrong topic**: If an action is only added to Topic A but the routing sends a request to Topic B, the action won't be available. Ensure actions are added to all relevant topics.
- **Assuming @future works**: @future methods are asynchronous and cannot return values — they cannot be used as Agentforce actions that need to return data.

## Official Documentation

- https://help.salesforce.com/s/articleView?id=ai.agentforce_actions.htm
- https://help.salesforce.com/s/articleView?id=ai.agentforce_apex_actions.htm
- https://help.salesforce.com/s/articleView?id=ai.agentforce_flow_actions.htm
