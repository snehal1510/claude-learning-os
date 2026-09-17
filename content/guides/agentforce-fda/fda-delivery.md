# Delivery & Implementation

## Overview

The Delivery phase transforms the blueprints produced in Discovery & Design into a working Agentforce agent. For FDA candidates, delivery knowledge goes beyond knowing how to configure topics and actions — it requires understanding the full project lifecycle: what to build in what order, how to migrate from sandbox to production, what to monitor after go-live, and what documentation to hand over to the client.

Delivery methodology is where FDA differs most from the Agentforce Specialist certification. The Specialist cert tests product configuration knowledge; the FDA tests whether you can lead a delivery engagement from kickoff to handover, managing quality, risk, and stakeholder expectations throughout.

A successful FDA delivery produces not just a working agent, but a client team that can maintain and evolve it independently — with clear documentation, trained administrators, and monitoring dashboards in place before the consulting team disengages.

## Key Concepts

### Implementation Phases
The standard FDA delivery sequence: **Discovery → Design → Build → Test → Pilot → Full Deployment**. Each phase has defined entry criteria (what must be done before it starts), exit criteria (what must be complete before the next phase begins), and deliverables. Skipping phases — particularly the Pilot — is the most common cause of troubled deployments.

### Configuration Sequence
Within the build phase, configuration follows a logical dependency order:
1. Org setup (enable Agentforce, configure Einstein Trust Layer settings)
2. Permission sets (assign Agentforce admin and user permissions)
3. Agent User setup (configure the Salesforce user that runs agent actions)
4. Topics and instructions (define what the agent handles and how)
5. Actions (build the Apex, Flow, or API actions the topics call)
6. Prompt templates (if using grounded AI responses)
7. Testing (functional testing before handing to QA)
8. Activation (enable the agent in the channel)

### Sandbox-to-Production Deployment
Agentforce components are Salesforce metadata. They are deployed using **change sets** (for simpler deployments) or the **Metadata API / Salesforce CLI** (for complex or automated deployments). After deploying to production, always run a smoke test — a manual walkthrough of the key conversation paths — before activating the agent for customers.

### Post-Deployment Monitoring
The first 30 days are critical. Monitor daily: containment rate (primary health indicator), escalation rate, average response time, and CSAT (if available). Early containment rate dips signal topic gaps or action failures. Rapid response in the first month prevents negative customer experiences from compounding.

## How It Works / The Process

1. **Build in sandbox** — All configuration happens in a sandbox before touching production.
2. **Functional testing by the build team** — Test each topic and action in the Agent Builder simulator.
3. **QA review** — Formal test execution against the test plan produced in the design phase.
4. **UAT** — Business stakeholders validate the agent against the agreed success criteria.
5. **Deploy to production** — Use change sets or Metadata API to migrate all components.
6. **Smoke test in production** — Walk through critical paths to confirm deployment integrity.
7. **Pilot** — Enable for a limited user group or channel. Monitor closely.
8. **Full deployment** — Expand to all users and channels after pilot success.
9. **Handover** — Deliver runbook, training materials, and monitoring dashboard access to the client team.

## Hands-On / Practical Notes

- **Agent User permissions**: The Agentforce agent user must have permission to access the records and run the actions needed for its topics. Missing permissions cause action failures that are hard to debug in production.
- **Change set limitations**: Change sets have size limits. For large deployments, the Salesforce CLI with `sf project deploy` is more reliable.
- **Test in the channel**: Always test the agent in the actual deployment channel (e.g., Messaging, Experience Cloud) not just the Agent Builder simulator. Channel-specific rendering and session handling can expose issues the simulator does not.
- **Document everything as you build**: Runbooks are easiest to write during the build phase, not after. Capture configuration decisions and their rationale while they are fresh.

## Important FDA Exam Details

- Correct FDA phase sequence: **Discovery → Design → Build → Test → Pilot → Full Deployment**
- Most common build-phase configuration pitfall: **vague or overly broad Topic instructions**
- CRM data quality affects **agent grounding accuracy** — poor data = poor agent responses
- Agentforce components are deployed via **change sets or Metadata API** (not Data Loader, which handles records)
- Pilot phase purpose: **validate with real users at limited scale before full rollout**
- Key post-deployment monitoring period: **first 30 days**, daily review of containment rate

## Common Mistakes & Exam Traps

- **Building in production directly**: All Agentforce configuration should be done in sandbox first. Building in production risks exposing customers to untested agent behaviour.
- **No pilot phase**: Skipping from UAT to full deployment removes the safety net that catches real-world issues before they affect the entire customer base.
- **Forgetting Agent User permissions**: Actions fail silently if the agent user lacks permission to access the records or run the processes the actions require.
- **Confusing Data Loader with metadata deployment**: Data Loader moves records. Agentforce components are metadata — they move via change sets or Metadata API.

## Official Documentation

- Agentforce setup: https://help.salesforce.com/s/articleView?id=ai.agentforce_setup.htm
- Metadata deployment: https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/
- FDA methodology: https://partners.salesforce.com
