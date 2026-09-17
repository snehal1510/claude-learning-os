# Testing & Quality Assurance

## Overview

Testing an Agentforce implementation requires a different mindset from testing traditional software. Conventional software has deterministic outputs — given the same input, you get the same output. An AI agent is probabilistic — the same input may produce slightly different responses on different runs. This means testing must focus on verifying *behavioural boundaries* (does the agent stay within scope? does it escalate when it should?) rather than exact string matching.

The FDA testing competency covers the full quality assurance lifecycle: functional testing by the build team, formal QA execution, UAT with business stakeholders, performance testing, and regression testing after changes. Each stage has a defined purpose, audience, and set of artefacts.

Testing is also where containment rate — the primary Agentforce success metric — is first measured. Tracking containment rate during testing gives the team a baseline and identifies topics that need improvement before go-live.

## Key Concepts

### Test Scenario Categories

A complete Agentforce test suite covers five categories:

1. **Happy path**: The primary intended interaction — a customer asks exactly the kind of question the agent is designed to handle and receives a correct, complete response. This is the minimum viable test.

2. **Edge cases**: Variations of the intended use case that test boundary conditions — very short inputs, very long inputs, unusual but valid phrasings, requests that are partially in scope.

3. **Out-of-scope inputs**: Questions the agent is explicitly not designed to handle. Test that the agent declines gracefully, explains its scope, and offers escalation. This is critical for safety.

4. **Escalation scenarios**: Situations where the agent should hand off to a human — customer requests human assistance, issue is too complex, customer is distressed. Verify the escalation happens correctly and the context is passed to the human agent.

5. **Adversarial inputs**: Attempts to manipulate the agent into behaving outside its instructions — jailbreak attempts, prompt injection, roleplay scenarios. Verify the agent resists manipulation.

### Defect Severity Classification

- **P1 — Harmful response**: Agent says something dangerous, discriminatory, or that could cause real-world harm. Requires immediate agent deactivation. Example: giving medical dosage advice, making discriminatory statements.
- **P2 — Wrong answer**: Agent provides an incorrect but non-harmful response. Must be fixed before go-live. Example: quoting the wrong return policy, stating an incorrect order status.
- **P3 — Suboptimal answer**: Response is correct but poorly phrased, incomplete, or unnecessarily verbose. Should be fixed but is not a go-live blocker.
- **P4 — Cosmetic**: Minor formatting, tone, or phrasing issues. Log and fix in a future sprint.

### User Acceptance Testing (UAT)
UAT is a business exercise, not a technical one. The primary validators are **frontline service agents and their supervisors** — people who know what a good customer interaction looks like. The consulting team supports UAT but does not sign off on it. UAT validates that the agent meets the success criteria defined in Discovery. UAT should use the agreed test scripts, not ad-hoc exploration.

### Regression Testing
Any configuration change — adding a topic, modifying an instruction, adding an action — risks breaking existing behaviour. Regression testing re-executes the full test suite (or a targeted subset) after every change to detect regressions before they reach production. A regression suite that runs in under 30 minutes enables rapid iteration.

## How It Works / The Process

1. **Test plan creation** (Design phase): Document all test scenarios, expected outcomes, entry/exit criteria, and test data requirements.
2. **Build team functional testing**: Developers test each topic and action in the Agent Builder simulator as they build.
3. **QA execution**: A dedicated QA role (or the consultant in smaller projects) executes the formal test plan against the sandbox agent and logs defects.
4. **Defect remediation**: Build team fixes P1 and P2 defects; team reviews P3s for go/no-go decision.
5. **UAT**: Business stakeholders execute UAT scripts, provide feedback, and formally accept or reject the delivery.
6. **Regression testing**: Run after each change set that modifies the agent configuration.
7. **Performance testing**: Simulate concurrent conversations to verify the agent handles peak load.
8. **Go/No-Go decision**: Based on defect status, UAT sign-off, and containment rate target.

## Hands-On / Practical Notes

- **Use the Agent Builder conversation simulator** for rapid iteration during the build phase. It allows testing without activating the agent in a live channel.
- **Test with real customer language**: Use actual chat logs or call transcripts as input data. Customer phrasings are often significantly different from what the build team expects.
- **Measure containment rate during UAT**: Track which test scenarios required escalation. This gives a pre-launch containment rate estimate and identifies which topics need improvement.
- **Document expected vs. actual**: Every test case should have a documented expected outcome. Without it, testers cannot objectively determine pass/fail.
- **Retest after every fix**: Fixing a P2 defect can inadvertently create a new P2 in a related topic. Always regression-test the surrounding topics after a fix.

## Important FDA Exam Details

- Five test scenario categories: **happy path, edge cases, out-of-scope, escalation, adversarial**
- P1 = **harmful response** → immediate deactivation
- P2 = **wrong answer** → must fix before go-live
- P3 = **suboptimal** → should fix, not a blocker
- P4 = **cosmetic** → log for future sprint
- UAT primary validators: **frontline service agents and business stakeholders**, not the consulting team
- Regression testing: triggered after **any configuration change** to the agent
- Containment rate formula: **(agent-resolved conversations ÷ total conversations) × 100**

## Common Mistakes & Exam Traps

- **Happy path only testing**: Failing to test out-of-scope and adversarial scenarios means the agent's safety boundaries are unvalidated. This is a critical gap.
- **Consulting team self-approving UAT**: UAT is a client acceptance exercise. The consulting team cannot sign off their own work.
- **Skipping regression after changes**: Every configuration change carries regression risk. Skipping regression testing is how P2 defects reach production undetected.
- **Treating P3 as a blocker**: P3 defects are quality improvements, not release blockers. Holding the release for P3s delays go-live without meaningfully reducing risk.

## Official Documentation

- Agentforce testing: https://help.salesforce.com/s/articleView?id=ai.agentforce_testing.htm
- Agent Builder simulator: https://help.salesforce.com/s/articleView?id=ai.agentforce_agent_builder.htm
- FDA methodology: https://partners.salesforce.com
