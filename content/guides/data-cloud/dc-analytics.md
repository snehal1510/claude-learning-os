# Analytics & Reporting

## Overview

Data Cloud provides several built-in tools for monitoring, exploring, and reporting on your data — from individual profile lookup to org-wide data quality metrics to integration with Salesforce's CRM Analytics platform for advanced dashboarding. Understanding which tool to use for which scenario is both a practical skill and an exam topic.

The key built-in tools are Profile Explorer (individual profile lookup) and Data Explorer (object-level data browsing and quality monitoring). For advanced analytics and custom dashboards, Data Cloud integrates with CRM Analytics (formerly Tableau CRM) to bring unified customer data into the broader analytics ecosystem.

Beyond the UI tools, Data Cloud's audit and processing logs provide administrators with visibility into ingestion job performance, errors, and historical job runs — essential for troubleshooting and governance.

## Key Concepts

### Profile Explorer

Profile Explorer is the tool for viewing an individual customer's Unified Profile. You search for a specific person using any Contact Point identifier (email, phone, name). The result shows:
- Merged attribute values from identity resolution
- All associated Contact Points (emails, phones, addresses)
- The **identity graph**: a visual representation of which source Individual records contributed to this Unified Individual, and how they were matched

Profile Explorer is essential for verifying that identity resolution worked correctly for specific customers and for troubleshooting merge issues.

### Data Explorer

Data Explorer provides object-level visibility into Data Cloud's data model. Key capabilities:
- Browse all DLOs and DMOs and see their row counts
- Sample field values to verify ingestion correctness
- View **data quality metrics** per field: null rate (% of records with no value), distinct value count, fill rate
- Inspect data at scale without writing SQL

Data quality metrics in Data Explorer are the primary tool for monitoring field completeness and identifying data issues before they affect segmentation or identity resolution.

### CRM Analytics Integration

CRM Analytics (formerly Tableau CRM) can connect to Data Cloud as a data source, enabling:
- Custom dashboards built on unified customer data
- AI-powered insights (Einstein Discovery) on Data Cloud datasets
- Cross-cloud analytics combining CRM data with Data Cloud unified profiles
- Scheduled dataset refreshes from Data Cloud to CRM Analytics

This integration requires configuration in both Data Cloud and CRM Analytics. Once connected, Data Cloud DMO data is available as datasets in the CRM Analytics dataset builder.

### Processing History and Job Logs

Each data stream in Data Cloud has a processing history that records:
- Timestamp of each ingestion run
- Number of records ingested successfully
- Number of records with errors
- Overall job status (success, partial success, failure)

This log is the primary tool for troubleshooting ingestion failures and monitoring data freshness.

## How It Works

**Profile Explorer**:
1. Navigate to Data Cloud → Profile Explorer
2. Search by email, phone, or name
3. View the consolidated profile, Contact Points, and identity graph

**Data Explorer**:
1. Navigate to Data Cloud → Data Explorer
2. Select a DLO or DMO from the object list
3. View row count, browse field values, and check data quality metrics per field

**CRM Analytics Integration**:
1. In Data Cloud: configure CRM Analytics as a connected output
2. In CRM Analytics: create a new dataset using Data Cloud as the source
3. Select DMO fields to include; configure refresh schedule
4. Build dashboards using the dataset

**Processing History**:
1. Navigate to Data Cloud → Data Streams
2. Select a specific data stream
3. Click Processing History to view job run logs

## Hands-On Implementation Notes

- Profile Explorer searches are fast but limited to Contact Point identifiers — you cannot search by arbitrary field values
- Data Explorer field quality metrics refresh on a schedule — they may not reflect the absolute latest ingestion
- CRM Analytics integration requires the CRM Analytics user to have Data Cloud data access permissions
- Ingestion job logs in Processing History are retained for a limited period — export or screenshot before they age out if needed for audit purposes
- Data Explorer sampling shows a subset of records — it is not a full data export tool

## Important Exam Details

- **Profile Explorer** = individual Unified Profile lookup + identity graph visualization
- **Data Explorer** = object-level data browsing + field-level quality metrics (null rates, fill rates)
- **CRM Analytics** = advanced dashboards and AI insights on Data Cloud data (requires configuration)
- **Processing History** = data stream ingestion job logs (timestamps, record counts, errors)
- Data Explorer shows **null rates** — this is the primary data quality metric to know for the exam
- Profile Explorer uses **Contact Point identifiers** (email, phone) for search — not arbitrary fields
- CRM Analytics integration is **bidirectional** only in the sense that CRM Analytics reads from Data Cloud — data does not flow back from CRM Analytics to Data Cloud

## Common Mistakes & Exam Traps

- **Profile Explorer ≠ Data Explorer**: Profile Explorer = individual lookup; Data Explorer = table/object browsing
- **Data Explorer ≠ SQL query tool**: You browse and sample data; you do not run arbitrary SQL queries in Data Explorer
- **CRM Analytics is not automatic**: The integration requires explicit configuration; Data Cloud data does not appear in CRM Analytics without setup
- **Processing history ≠ audit trail**: The audit trail records user actions (configuration changes); processing history records data job runs — different things
- **Profile Explorer searches by Contact Point**: You cannot look up a profile by a custom field value — only by recognized Contact Point identifiers

## Official Documentation

- [Profile Explorer](https://help.salesforce.com/s/articleView?id=sf.c360_a_profile_explorer.htm)
- [Data Explorer](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_explorer.htm)
- [CRM Analytics Integration with Data Cloud](https://help.salesforce.com/s/articleView?id=sf.c360_a_crm_analytics.htm)
- [Monitor Data Streams](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_stream_overview.htm)
