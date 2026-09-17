# Activation & Data Actions

## Overview

Activation is the final stage of the Data Cloud pipeline — it is how segmented, unified customer data gets delivered to downstream systems for use in campaigns, personalization, and automated workflows. Without activation, all the data ingestion, modeling, identity resolution, and segmentation work would remain locked inside Data Cloud. Activation is what makes Data Cloud's insights actionable.

Data Cloud supports multiple activation target types to cover the full range of customer engagement scenarios: sending audiences to Marketing Cloud for email campaigns, updating CRM records for sales follow-up, delivering files to storage for third-party advertising platforms, or triggering real-time Salesforce Flows when a customer's segment membership changes.

A related feature — Data Actions — enables event-driven, near real-time activation triggered by specific segment membership changes (entry or exit). This is distinct from scheduled batch activation and is critical for time-sensitive use cases like cart abandonment triggers, post-purchase journeys, and churn prevention.

## Key Concepts

### Activation Target Types

- **Salesforce CRM Activation**: Sends segment data to a connected Salesforce CRM org. Can create or update CRM records, add members to Campaigns, or trigger CRM automations.

- **Marketing Cloud Activation**: Sends segment members to Marketing Cloud as contacts, making them available in Journey Builder, Email Studio, and Contact Builder.

- **Cloud File Storage (S3, SFTP)**: Delivers segment data as files (CSV) to a cloud storage location. Used for third-party systems, data warehouses, or advertising platforms that consume file-based inputs.

- **Partner / Advertising**: Sends audiences to advertising platforms (Meta, Google, LinkedIn) for targeted advertising use cases.

### Attribute Sets

When configuring an activation target, you define an attribute set — the specific DMO fields you want to include in the activation payload. This controls what data is sent to the downstream system. For Marketing Cloud activation, attribute sets define which fields become Marketing Cloud contact attributes.

### Data Actions

Data Actions are event-driven triggers that fire when a customer's segment membership changes. They can invoke:
- **Salesforce Flow**: Trigger a Flow to run in the CRM org (create records, send notifications, update fields)
- **Platform Event**: Publish a Platform Event that any subscriber can react to

Data Actions are configured with a trigger type:
- **Segment Entry**: Fires when a record first joins the segment
- **Segment Exit**: Fires when a record leaves the segment (no longer qualifies)

### Activation Schedule

Batch activation targets publish on a configured schedule (hourly, daily, etc.). Streaming activation targets update continuously as streaming segment membership changes. For Data Actions, the trigger fires in near real-time when the segment entry/exit condition is met.

## How It Works

1. Navigate to Data Cloud → Activation Targets → New
2. Select the activation target type (Marketing Cloud, CRM, S3, etc.)
3. Authenticate and configure target-specific settings
4. Define the attribute set — select which DMO fields to include
5. Create a segment and link it to the activation target during publishing
6. Configure the publish schedule (for batch) or enable real-time publishing (for streaming)

For Data Actions:
1. Navigate to Data Cloud → Data Actions → New
2. Select the segment and trigger type (Entry or Exit)
3. Select the action type (Flow or Platform Event)
4. Configure the Flow or event payload
5. Activate the Data Action

## Hands-On Implementation Notes

- **Marketing Cloud Activation**: Requires an active Marketing Cloud Connected Account and a Business Unit selection; attribute set fields map to MC contact attributes
- **CRM Activation**: Requires a Connected Org; select the target CRM object and field mappings
- **Data Actions**: Navigate to Data Cloud → Data Actions; the segment must already exist; the invoked Flow must have `@InvocableMethod` if using Apex, or be an autolaunched Flow
- Test Data Actions in a sandbox before production to verify Flow invocation behavior
- Monitor activation job history in the Activation Target's job log

## Important Exam Details

- **Four activation target types**: Salesforce CRM, Marketing Cloud, Cloud File Storage, Partner/Advertising
- **Attribute set** = the field selection/mapping for the activation payload
- **Data Actions** trigger on segment **Entry** or **Exit** events — not on data ingestion
- **Data Actions** invoke either a **Salesforce Flow** or a **Platform Event**
- Batch activation runs on a **schedule**; streaming runs **continuously**
- Data Actions are **near real-time** — they fire when segment membership changes, not on a schedule
- Publishing a segment to an activation target is a **manual step** — segments are not auto-published on save

## Common Mistakes & Exam Traps

- **Activation ≠ Segment creation**: Creating a segment does not automatically send it anywhere; you must publish to an activation target
- **Data Actions ≠ scheduled activation**: Data Actions are event-driven (entry/exit), not scheduled
- **Screen Flows not supported for Data Actions**: Only autolaunched Flows can be invoked by a Data Action
- **Marketing Cloud ≠ CRM**: These are separate activation targets with different configuration and behavior
- **Attribute set is per activation target**: You define the payload separately for each target; one segment can be activated to multiple targets with different attribute sets

## Official Documentation

- [Activation Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_activation.htm)
- [Data Actions](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_actions.htm)
- [Marketing Cloud Activation](https://help.salesforce.com/s/articleView?id=sf.c360_a_mc_activation.htm)
- [Salesforce CRM Activation](https://help.salesforce.com/s/articleView?id=sf.c360_a_sfcrm_activation.htm)
