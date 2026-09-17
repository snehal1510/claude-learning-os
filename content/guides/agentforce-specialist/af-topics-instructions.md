# Topics & Instructions

## Overview

Topics are the heart of Agentforce configuration. A Topic is a named grouping of related user intents paired with natural-language instructions that tell the agent how to behave within that domain. For example, a service agent might have an "Order Status" topic (handling intent like "where is my package?", "track my order", "delivery date") and a "Returns" topic (handling "I want to return my purchase", "refund request", "damaged item").

When a user message arrives, Agentforce's LLM evaluates it against all configured topic descriptions to determine the best matching topic — a process called intent classification. This is fundamentally different from keyword routing or decision trees: the LLM understands paraphrasing, context, and nuance. A user asking "any update on my delivery?" and "where's my stuff?" will both correctly route to an Order Status topic even if neither phrase appears in the topic name.

Instructions are the natural-language rules within a topic that guide the agent's behavior. They tell the agent what information to gather, which actions to invoke, what tone to use, and what limits to respect. Writing clear, specific, action-oriented instructions is the single most important factor in producing consistent, reliable agent behavior.

## Key Concepts

### Topic Description
The topic description is used by the LLM to classify incoming messages. A well-written description accurately characterizes the types of user requests this topic handles. Include representative phrases, common synonyms, and scenario variety. The quality of your description directly affects routing accuracy.

### Topic Instructions
Instructions are plain-English directives written in the instruction editor. They should:
- Tell the agent **what to do** (e.g., "Always retrieve the customer's account record before responding to order inquiries.")
- Tell the agent **what not to do** (e.g., "Do not provide specific delivery date guarantees — refer to the estimated date from the order record.")
- Define **escalation conditions** (e.g., "If the customer mentions a damaged item that arrived over 30 days ago, escalate to a human agent.")

### Escalation Topic
An Escalation (or General/Fallback) topic catches user messages that don't match any specific topic. It should instruct the agent to gracefully acknowledge the out-of-scope request and either guide the user to what the agent can help with or initiate a transfer to a human agent. Every production agent should have a well-configured fallback.

### Sample Utterances
You can add example user phrases to a topic to help the LLM classify intents more accurately. These act as training hints — they don't restrict what phrases the LLM will match, but they provide strong signal for correct routing, especially for topics with similar names or overlapping scope.

## How It Works

1. User sends a message.
2. Agentforce sends the message + all topic descriptions to the LLM.
3. LLM classifies which topic best matches (or "none").
4. If matched: LLM follows that topic's instructions and selects appropriate actions.
5. If not matched: agent invokes the fallback/escalation topic.
6. Agent generates a response and/or invokes an action, returns result to user.

## Hands-On Implementation Notes

- Access topics via **Agent Builder → Topics tab → New Topic**.
- Fill in: **Name** (short, human-readable), **Description** (used for LLM routing), **Scope** (what this topic does and does not handle), and **Instructions** (behavioral rules).
- Add **Actions** to the topic: only actions added to a topic are available when that topic is active.
- Use the **Simulator** in Agent Builder to test routing: type sample messages and verify the correct topic is selected.
- To configure an out-of-scope handler: create a topic named "General" or "Escalation" and leave its description as the catch-all. In its instructions, include: "If the user's request is outside your configured topics, politely inform them of what you can help with and offer to transfer to a human agent."

## Important Exam Details

- A **Topic** = user intent grouping + instructions + available actions.
- LLM does **intent classification**, not keyword matching.
- **Sample utterances** improve classification accuracy but are not strict filters.
- An **Escalation/Fallback topic** should be included in every production agent.
- Instructions are **natural language** — not code, not SOQL, not decision tree syntax.
- Topics must have at least one action added to be useful (though an instruction-only topic can still respond conversationally).
- You can have **multiple topics** per agent — each handles a different domain.

## Common Mistakes & Exam Traps

- **Overly vague topic descriptions**: A topic described as "Help with things" will match everything — or nothing consistently. Be specific.
- **No fallback topic**: Without an escalation/fallback, out-of-scope requests produce unexpected LLM behavior with no governance.
- **Instructions that contradict each other**: Conflicting instructions confuse the LLM and produce inconsistent responses. Review instructions for logical conflicts.
- **Assuming keyword matching**: Exam questions may describe a scenario where the agent "should route based on keywords." The correct Agentforce answer is always LLM-based intent classification, not keywords.
- **Adding actions globally vs. per topic**: Actions are added at the topic level. An action available in Topic A is not automatically available in Topic B — you must add it explicitly.

## Official Documentation

- https://help.salesforce.com/s/articleView?id=ai.agentforce_topics.htm
- https://help.salesforce.com/s/articleView?id=ai.agentforce_topic_instructions.htm
