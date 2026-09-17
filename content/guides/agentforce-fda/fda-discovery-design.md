# Discovery & Design

## Overview

The Discovery & Design phase is the foundation of every successful Agentforce FDA delivery. Unlike product-feature certifications that test what Agentforce can do, the FDA tests whether you know how to deliver it to an enterprise client. Discovery is where you translate vague business ambitions ("we want AI") into specific, scoped, achievable agent use cases with clear success criteria.

A well-run discovery engagement prevents the most common Agentforce implementation failures: building an agent for the wrong use case, launching without stakeholder buy-in, or going live with a scope so broad that the agent performs poorly across all topics. Time invested in discovery directly reduces rework in the build phase.

Design bridges discovery and build. It produces the blueprints — conversation flow diagrams, topic maps, persona definitions — that allow a build team to configure Agentforce with confidence. Without design artefacts, builders make assumptions that diverge from stakeholder expectations, leading to expensive corrections during UAT.

## Key Concepts

### Use Case Prioritisation
Not all use cases are equal. The Effort vs. Impact matrix is the standard FDA tool for ranking candidates. Plot each use case on a 2x2 grid: impact (business value, volume, cost savings) on one axis, implementation effort (data readiness, integration complexity, content availability) on the other. **High-impact, low-effort use cases** (the top-left quadrant) are the first release candidates. They deliver quick ROI, build stakeholder confidence, and give the team low-risk experience with the platform.

### Agent Persona Design
Before any configuration, define the agent's identity: its name (what customers call it), its tone (formal, friendly, technical), its scope (exactly which topics it handles), and its escalation persona (how it hands off to a human). These decisions shape every Topic instruction written in the build phase. A well-defined persona ensures consistency across all agent interactions and sets accurate customer expectations.

### Technical Prerequisites Assessment
Agentforce quality is bounded by data quality. Before committing to a scope, assess: Are the CRM records the agent will reference complete and accurate? Are the required integrations available (for Actions)? Does the org have the necessary licences? A gap in any of these areas is a delivery risk that must be mitigated or reflected in the scope.

### Success Criteria Definition
Success criteria must be defined in discovery, before a line of configuration is written. They answer: how will the client measure whether this implementation succeeded? Typical criteria include a target containment rate (e.g., 60% within 90 days), a CSAT score threshold (e.g., ≥ 4.0/5.0), and a cost savings target. Without pre-agreed criteria, projects end in disputes about whether the outcome was acceptable.

## How It Works / The Process

1. **Stakeholder interviews** — Interview service managers, frontline agents, IT, compliance, and executives. Each stakeholder group reveals different requirements and risks.
2. **Process mapping** — Document the current customer service process. Identify high-volume, repetitive query types that are good candidates for automation.
3. **Use case identification** — Generate a longlist of potential agent use cases from the process maps and interviews.
4. **Prioritisation workshop** — Score each use case on impact and effort. Select the first-release scope together with stakeholders.
5. **Persona design** — Define the agent's name, tone, scope, and escalation rules. Get sign-off from business and brand stakeholders.
6. **Conversation design** — Create flow diagrams, sample dialogues, and topic maps that document the intended agent behaviour in human-readable form.
7. **Success criteria sign-off** — Document and agree KPIs, measurement methodology, and review cadence with the client.

## Hands-On / Practical Notes

- Run discovery workshops with **business and IT together** — business knows the problem, IT knows the constraints. Separating them produces incomplete requirements.
- Use **sample customer conversations** (chat logs, call transcripts) as input to use case identification. Real data reveals what customers actually ask, not what stakeholders assume they ask.
- **Pilot over big bang** — design for a limited pilot (one channel, one team, specific use cases) before full deployment. Pilots surface issues cheaply.
- Always document **out-of-scope use cases** explicitly. This prevents scope creep during the build phase and sets clear expectations with the client.

## Important FDA Exam Details

- The effort vs. impact matrix produces **high-impact, low-effort** first-release candidates — not high-complexity, high-prestige ones.
- Persona design outputs: agent **name, tone, scope, escalation triggers** — these become Topic instructions in the build phase.
- Technical prerequisites: **CRM data quality** is the most common and highest-impact prerequisite to assess.
- Success criteria must be agreed **before build begins**, not retrospectively after go-live.
- Conversation design produces: **flow diagrams, topic maps, sample utterances, escalation decision trees**.

## Common Mistakes & Exam Traps

- **Scope too broad**: Trying to automate every customer interaction in the first release. FDA methodology recommends a focused pilot.
- **Skipping change management**: Ignoring service team resistance. FDA requires a change management plan as a design-phase deliverable.
- **Data quality as an afterthought**: Assuming the CRM data is good enough without assessing it. Data quality issues discovered in UAT are expensive.
- **No success criteria**: Building to a vague mandate of "make it work with AI." Always define measurable outcomes before build.

## Official Documentation

- Agentforce overview: https://help.salesforce.com/s/articleView?id=ai.agentforce_intro.htm
- FDA partner resources: https://partners.salesforce.com
- Agent Builder documentation: https://help.salesforce.com/s/articleView?id=ai.agentforce_agent_builder.htm
