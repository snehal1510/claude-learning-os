# Calculated Insights & SQL

## Overview

Calculated Insights are user-defined SQL-based metric definitions that compute aggregated values from Data Model Objects in Data Cloud. They allow you to create custom metrics — such as "total purchases in the last 90 days", "average email open rate", or "days since last login" — and make those metrics available as attributes in the Segment Builder.

Without Calculated Insights, you can only segment on raw field values (e.g., "email opt-in = true" or "city = London"). With Calculated Insights, you can segment on computed business metrics derived from your entire data model. This dramatically expands segmentation power and enables highly personalized, behavior-driven audiences.

The SQL used in Calculated Insights is a variant that operates on Data Model Object names and their field paths. It supports standard aggregation functions (SUM, COUNT, AVG, MIN, MAX), WHERE clauses for filtering, GROUP BY for dimensional grouping, and joins across related DMOs. Understanding the structure of this SQL and the concepts of dimensions vs measures is essential for the exam.

## Key Concepts

### Dimensions vs Measures

A Calculated Insight has two types of output fields:

- **Dimensions**: Categorical grouping attributes — the equivalent of GROUP BY columns in SQL. Examples: product_category, purchase_channel, country_code. Dimensions define how the data is sliced. After publication, they appear as segmentation attributes you can filter on.

- **Measures**: Numeric aggregated values computed within each dimensional group. Examples: SUM(order_amount) as total_spend, COUNT(order_id) as order_count. Measures are the computed metrics. They appear as numeric attributes in Segment Builder.

### Batch vs Streaming Calculated Insights

- **Batch**: Computed on a scheduled basis (e.g., nightly). Suitable for metrics that don't need to be current to the minute — historical aggregations, monthly totals, etc.

- **Streaming**: Updated in near real-time as new data arrives. Suitable for time-sensitive metrics like current cart value, real-time engagement score, or last-activity timestamp. Streaming insights have constraints on the aggregation patterns they support.

### SQL Structure
Calculated Insight SQL references DMO objects using their API names. A basic example:
```sql
SELECT
  ssot__Individual__c.ssot__Id__c AS individual_id,  -- dimension
  SUM(Orders__c.amount__c) AS total_spend            -- measure
FROM ssot__Individual__c
JOIN Orders__c ON Orders__c.individual_id__c = ssot__Individual__c.ssot__Id__c
GROUP BY ssot__Individual__c.ssot__Id__c
```

The result: each Individual gets a `total_spend` measure value that appears in Segment Builder.

### Using Insights in Segmentation
After a Calculated Insight is published, its measure fields become available as attributes in Segment Builder under the relevant DMO. You can add filter conditions such as:
- `total_spend > 500`
- `email_open_count > 3 in last 30 days`
- `days_since_last_purchase <= 14`

## How It Works

1. Navigate to Data Cloud → Calculated Insights → New
2. Write the SQL query referencing DMO field paths
3. Designate which output columns are dimensions and which are measures
4. Choose batch or streaming computation mode
5. Run the insight to validate SQL and preview results
6. Publish the insight — it becomes available in Segment Builder

## Hands-On Implementation Notes

- Access via Data Cloud → Insights → Calculated Insights
- Use the SQL editor with syntax highlighting and validation
- Preview results before publishing to check correctness
- After publishing, check Segment Builder — the insight's measures appear under the primary DMO's attributes
- Streaming insights require a streaming-compatible data source and DMO setup
- If an insight fails validation, check: table/field names are correct DMO API names; aggregation syntax is valid; JOIN conditions are correct

## Important Exam Details

- **Dimensions** = categorical grouping (non-aggregated) fields
- **Measures** = numeric aggregated values (SUM, COUNT, AVG, MIN, MAX)
- **Batch** = scheduled refresh; **Streaming** = near real-time update
- Calculated Insights operate on **DMO data**, not raw DLO data
- After publishing, measures appear as **segmentation attributes** in Segment Builder
- Insights do NOT create new DMOs — they produce attribute values that augment existing DMO records
- Streaming insights have limitations on supported aggregation patterns vs batch

## Common Mistakes & Exam Traps

- **Dimensions are NOT numeric**: Dimensions are the categorical grouping fields (like product category), not the computed numbers
- **Insights run on DMOs**: They do not query DLOs or raw source data
- **Publishing is required**: Creating and validating an insight alone does not make it available in Segment Builder — you must publish it
- **Batch ≠ real-time**: Batch insights are stale until their next scheduled run; use streaming for time-sensitive metrics
- **No new DMO created**: Calculated Insights produce attribute values, not new objects in the data model

## Official Documentation

- [Calculated Insights Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_calculated_insights.htm)
- [Create a Calculated Insight](https://help.salesforce.com/s/articleView?id=sf.c360_a_create_calculated_insight.htm)
- [Use Insights in Segmentation](https://help.salesforce.com/s/articleView?id=sf.c360_a_segments.htm)
