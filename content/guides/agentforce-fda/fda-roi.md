# ROI & Success Metrics

## Overview

Demonstrating ROI is the final and often underestimated competency in the FDA. Building a working agent is not enough — FDA-certified consultants must be able to quantify the business value of the implementation and present it credibly to executive stakeholders. This separates delivery consultants from configuration technicians.

ROI measurement for Agentforce has two dimensions: efficiency (cost savings from deflecting conversations from human agents) and quality (customer satisfaction and resolution rates). An implementation that achieves high containment but destroys CSAT is not a success. The goal is optimal performance across both dimensions.

For the FDA exam, be prepared to calculate containment rate and cost savings from first principles, interpret KPI results, and advise on a continuous improvement approach when metrics fall short of targets.

## Key Concepts

### Primary KPIs

**Containment Rate** — The percentage of customer conversations fully resolved by the agent without human escalation.
Formula: `(Agent-resolved conversations ÷ Total conversations) × 100`
This is the single most important Agentforce metric. It directly drives cost savings and is the leading indicator of agent health.

**Average Handle Time (AHT) Reduction** — The reduction in time spent per customer interaction. Even when the agent escalates, it can pass context to the human agent, reducing the time the human needs to spend re-gathering information.

**CSAT (Customer Satisfaction Score)** — Customer rating of the agent interaction, typically on a 1–5 or 1–10 scale. AI CSAT is often lower than human CSAT initially but improves as the agent is optimised. A CSAT gap of 0.5 points is common and manageable; a gap of 2+ points signals a fundamental quality problem.

**First Contact Resolution (FCR) Rate** — The percentage of customer issues resolved in a single interaction without follow-up. AI agents can improve FCR for simple queries by having immediate access to all relevant records.

**Escalation Rate** — The inverse of containment rate. `(Escalated conversations ÷ Total conversations) × 100`. High escalation rate = low containment rate. Monitor escalation reasons to identify which topics need improvement.

### Cost Savings Calculation

The standard FDA cost savings formula:

`Monthly savings = Deflected conversations × Average handle time (minutes) × Loaded cost per agent minute`

**Loaded cost** = total cost of employing a service agent including: base salary, employer taxes, benefits, office space, equipment, training, management overhead. Typically 1.3–1.8× base salary. Always use loaded cost, not just hourly wage, for accurate ROI calculation.

**Example**: 5,000 deflected conversations × 8 minutes average handle time × $1.20 loaded cost per minute = **$48,000 per month** in savings.

### Business Case Structure (CFO-Level)

A rigorous Agentforce business case includes:
1. **Investment**: Year 1 licence cost + implementation fees
2. **Annual savings**: Conversation deflection savings + efficiency gains
3. **Payback period**: Total investment ÷ Annual savings (in months)
4. **3-year ROI**: (3-year total savings − 3-year total costs) ÷ 3-year total costs × 100

### CSAT Benchmarking
Compare Agentforce CSAT against: (a) the human agent CSAT baseline for the same query types, (b) industry benchmarks for AI self-service, and (c) the target agreed in discovery. A CSAT gap between AI and human is normal; the question is whether it is narrowing over time.

## How It Works / The Process

1. **Define KPIs in Discovery**: Agree which metrics will be tracked, how they will be measured, and what targets constitute success — before any build work begins.
2. **Establish baselines**: Measure current human agent KPIs (handle time, CSAT, FCR, cost per conversation) before launch. Without baselines, you cannot calculate improvement.
3. **Instrument for measurement**: Configure Salesforce reporting to capture containment rate, CSAT surveys, and escalation data from the first day of go-live.
4. **First 30-day review**: Compare actuals to targets. Identify topics with high escalation rates for priority improvement.
5. **Quarterly executive reporting**: Present a concise dashboard: containment rate trend, CSAT trend, cost savings to date, improvements made in the quarter.
6. **Annual business case refresh**: Recalculate ROI with actual data. Use this to justify expanded scope and additional Agentforce investment.

## Hands-On / Practical Notes

- **Set up Salesforce reports before go-live**, not after. It is much harder to reconstruct historical data retroactively.
- **Segment CSAT by use case**: A 4.1/5.0 overall CSAT might hide a 3.5/5.0 on one topic and a 4.8/5.0 on another. Segmented data drives targeted improvement.
- **Investigate escalation reasons**: When an agent escalates, log *why* — "out of scope", "customer requested human", "action failed", "no matching record". This data is gold for optimisation.
- **Reforecast savings quarterly**: Containment rate improves as the agent is optimised. Update the business case with actual data to keep executive sponsorship engaged.

## Important FDA Exam Details

- Containment rate formula: **(agent-resolved ÷ total conversations) × 100**
- Cost savings formula: **deflected conversations × average handle time (minutes) × loaded cost per minute**
- "Loaded cost" includes: salary + benefits + overhead + management — **not just base hourly wage**
- Primary KPIs: **containment rate, CSAT, average handle time reduction, first contact resolution rate**
- Business case components: **investment, annual savings, payback period, 3-year ROI**
- A CSAT gap of 0.5 between AI and human is **normal and manageable**; a gap of 2+ signals a quality problem
- Escalation rate + containment rate = **100%** (they are complements)

## Common Mistakes & Exam Traps

- **Using base salary instead of loaded cost**: Loaded cost is always higher (typically 1.3–1.8×). Using base salary understates ROI on paper but creates expectations the actual savings cannot meet.
- **No pre-launch baseline**: Without knowing the current handle time and cost per conversation, you cannot calculate savings. Establish baselines before go-live.
- **Treating CSAT gaps as failures**: An initial AI CSAT lower than human CSAT is expected. The exam question is likely testing whether you know to investigate and improve, not panic and decommission.
- **Forgetting escalation rate = 1 − containment rate**: These two metrics are mathematical inverses. A 65% containment rate means a 35% escalation rate.

## Official Documentation

- Agentforce analytics: https://help.salesforce.com/s/articleView?id=ai.agentforce_analytics.htm
- Einstein for Service metrics: https://help.salesforce.com/s/articleView?id=service.einstein_analytics_service_overview.htm
- FDA methodology: https://partners.salesforce.com
