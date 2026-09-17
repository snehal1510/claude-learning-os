# Agent Builder & Configuration

## Overview

Agentforce Agent Builder is the no-code configuration interface in Salesforce Setup where administrators create, configure, and manage AI agents. Unlike traditional chatbot builders that rely on decision trees and scripted flows, Agent Builder produces agents powered by a large language model (LLM) that can reason about user intent and autonomously determine which actions to take. This fundamental difference means the configuration focus shifts from "draw every possible conversation path" to "define scope, write clear instructions, and make the right actions available."

Every Agentforce agent is built around three core elements: the agent's identity (name, description, and persona), the topics it can handle (each topic groups related user intents with associated instructions and actions), and the channels through which it is deployed. Agent Builder provides a unified interface to configure all three, plus a built-in conversation simulator for testing before going live.

Understanding Agent Builder deeply means understanding the deployment model: you create a Draft version, iterate and test, then Activate it to serve real users. Only one version can be Active at a time, protecting live users from in-progress changes. This versioning approach is essential for production-quality deployments.

## Key Concepts

### Agent Types
Salesforce provides pre-built agent types as starting points — Service Agent (for customer service), Sales Agent (for sales development), and others depending on licensing. Admins can also create custom agents from scratch. Choosing the right agent type gives you pre-configured topic templates appropriate for that use case.

### Agent User
Every agent has an associated Agent User — a dedicated Salesforce user record whose permissions determine what data and actions the agent can access at runtime. When the agent runs a Query Records action or calls Apex, it runs with this user's profile and permission sets. This is a critical security boundary: the Agent User should have the minimum permissions needed for the agent's tasks (principle of least privilege).

### Channels
Agentforce supports: **Experience Cloud** (self-service portals), **Messaging** (SMS, WhatsApp, Facebook Messenger via Messaging for In-App and Web), **Slack** (via Slack integration), and **Embedded** (custom web apps using the Agentforce API). Each channel requires separate deployment configuration but shares the same underlying agent configuration.

### Draft vs. Active Versions
Agents use version control. The **Draft** version is your working copy — make changes here without affecting live users. The **Active** version handles all real customer interactions. When you're ready to release changes, you activate the draft, which becomes the new active version.

## How It Works

1. **Create the agent** — in Setup → Agents → New Agent. Name it, choose an agent type, write a description.
2. **Configure the Agent User** — assign or create a Salesforce user record with scoped permissions.
3. **Add Topics** — define the intents the agent handles (see the Topics & Instructions guide).
4. **Add Actions to Topics** — attach standard or custom actions to each topic.
5. **Test in Simulator** — use Agent Builder's built-in conversation simulator to test routing and responses.
6. **Activate** — promote the Draft to Active when testing is complete.
7. **Deploy to Channel** — configure the channel (Experience Cloud site, Messaging deployment, etc.) to use the active agent.

## Hands-On Implementation Notes

- Navigate to **Setup → Agents** to see all configured agents.
- Use the **Agent Builder canvas** to see Topics as cards — click a topic to edit its instructions and actions.
- The **Simulator** panel (Preview button) lets you type messages and watch the agent respond in real time, showing which topic was selected and which actions were invoked.
- To configure the Agent User: Setup → Agents → [Agent Name] → Agent User. Assign a dedicated user created specifically for this agent.
- To activate: open the agent in Agent Builder → click **Activate** (top right). You'll be warned if topics have no actions.

## Important Exam Details

- **Agentforce uses LLM reasoning** — no decision trees, no keyword matching.
- **Agent User = the runtime identity** of the agent for data access purposes.
- **Draft vs Active**: only Active version handles live users; Draft is for development.
- **Screen Flows are NOT supported** as Agentforce actions (Autolaunched Flows only).
- Supported channels: Experience Cloud, Messaging (SMS/WhatsApp/Facebook), Slack, Embedded.
- Agent Builder is accessed via **Setup → Agents** (not from App Launcher like most apps).
- An agent without an active version cannot handle any user interactions.

## Common Mistakes & Exam Traps

- **Confusing Agentforce with Einstein Bots**: Einstein Bots use decision trees; Agentforce uses LLM reasoning. They are architecturally different products. If an exam question says "dialog flow" or "decision tree," that's Einstein Bot, not Agentforce.
- **Agent User permissions**: Forgetting to assign the correct permissions to the Agent User results in actions failing at runtime — even if the agent configuration looks correct.
- **Activating without testing**: Activating directly to production without using the simulator is a deployment risk. Always test in simulator first.
- **Channel vs. agent version confusion**: Channels are configured separately from agent versions. Activating a new agent version doesn't automatically push it to all channels — you configure the channel to point to the agent, and the active version is served automatically.

## Official Documentation

- https://help.salesforce.com/s/articleView?id=ai.agentforce_intro.htm
- https://help.salesforce.com/s/articleView?id=ai.agentforce_agent_builder.htm
- https://help.salesforce.com/s/articleView?id=ai.agentforce_channels.htm
