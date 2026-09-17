# Segmentation & Audiences

## Overview

Segmentation in Data Cloud is the process of defining audiences — groups of Unified Individual profiles that meet specific criteria — for use in marketing campaigns, personalization, and activation. The Segment Builder provides a no-code interface for creating filter-based audience definitions using any attribute from your Data Model Objects, Calculated Insights, and related objects.

Unlike list-based segmentation tools of the past, Data Cloud segments are dynamic: membership is continuously evaluated against your live data. When a customer's data changes in a way that meets or no longer meets segment criteria, their membership updates accordingly — either in near real-time (streaming segments) or on a schedule (batch segments).

Understanding segment types, filter logic, related attributes, and waterfall segmentation is essential for the exam. These concepts represent the practical output of all the ingestion, modeling, and identity work done earlier in the Data Cloud pipeline.

## Key Concepts

### Segment Types

- **Batch Segment**: Membership is recalculated on a configured schedule (e.g., nightly, every 12 hours). All qualifying records as of the run time are included. Best for campaigns that do not require real-time precision.

- **Streaming Segment**: Membership updates in near real-time as qualifying data changes. When a customer enters or exits the segment criteria, their membership changes automatically. Best for triggered journeys, real-time personalization, and time-sensitive activation.

### Filter Logic: AND vs OR

Segment Builder uses containers to group filter criteria. The relationship between containers can be AND or OR:

- **AND**: A record must satisfy ALL containers to qualify. AND narrows the audience.
- **OR**: A record must satisfy AT LEAST ONE container to qualify. OR broadens the audience.

Within a single container, multiple criteria can also be combined with AND/OR logic.

### Related Attributes

Related attributes let you filter on fields from DMOs that are related to the segment's primary DMO via configured relationships. For example:
- Segmenting on Unified Individual, but filtering on `Contact Point Email.email_domain` (related via belongs-to)
- Filtering on purchase history from a related Sales Order DMO

This traversal of relationships is key to building sophisticated, multi-dimensional segments without needing SQL.

### Waterfall Segmentation

Waterfall segmentation is a Data Cloud feature for managing mutually exclusive audience groups. You define multiple segments in a priority order. Records are evaluated against segments sequentially — when a record qualifies for a segment, it is assigned there and suppressed from all lower-priority segments. This ensures each record appears in at most one segment, preventing overlap in downstream campaigns.

### Publish to Activation

After building a segment, you publish it to one or more activation targets. For batch segments, publishing occurs on the segment's configured schedule. For streaming segments, membership changes are published continuously. Publishing is the action that sends segment data to the downstream system (Marketing Cloud, Salesforce CRM, etc.).

## How It Works

1. Navigate to Data Cloud → Segments → New
2. Select the primary DMO to segment on (typically Unified Individual)
3. Add filter containers and define criteria using DMO attributes, related attributes, or Calculated Insight values
4. Configure AND/OR logic between containers
5. Choose segment type (Batch or Streaming) and refresh schedule
6. Preview estimated membership count
7. Publish the segment to one or more activation targets

## Hands-On Implementation Notes

- Access Segment Builder at Data Cloud → Segments → New
- Primary DMO selection: choose Unified Individual for person-based segments
- Add filter: click "+ Add Filter" → browse available attributes by DMO
- Related attributes appear under their parent DMO in the attribute picker
- Segment count estimate: click "Calculate Count" — this is an approximation
- For waterfall segmentation: Data Cloud → Segments → Waterfall Segmentation → configure segment priority
- Streaming segments require a streaming data source feeding the relevant DMOs

## Important Exam Details

- **Batch** = scheduled; **Streaming** = near real-time
- AND logic = narrows audience; OR logic = broadens audience
- **Related attributes** traverse DMO relationships without SQL
- **Waterfall segmentation** ensures mutually exclusive segment membership
- Segments are published to **activation targets** — not automatically synced
- Segment membership is on **Unified Individual**, not raw Individual records
- Streaming segments are supported only when the underlying data stream is also streaming
- Estimated count (Calculate Count) is an approximation — actual published count may differ

## Common Mistakes & Exam Traps

- **Batch ≠ real-time**: A batch segment will not update mid-day even if a customer qualifies — it waits for the next scheduled run
- **AND broadens / OR narrows**: Backwards thinking is common — AND narrows (must match all), OR broadens (must match any)
- **Waterfall ≠ sequential filtering**: Waterfall is about priority ordering and mutual exclusion across segments, not applying filters in sequence within one segment
- **Publishing is required**: Building and saving a segment does not send data anywhere — you must publish to an activation target
- **Segmenting on DLOs**: You always segment on DMO/Unified Individual data, never directly on DLO data

## Official Documentation

- [Segments Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_segments.htm)
- [Waterfall Segmentation](https://help.salesforce.com/s/articleView?id=sf.c360_a_waterfall_segmentation.htm)
- [Streaming Segments](https://help.salesforce.com/s/articleView?id=sf.c360_a_streaming_segments.htm)
- [Activation Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_activation.htm)
