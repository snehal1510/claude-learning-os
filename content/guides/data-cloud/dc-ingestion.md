# Data Ingestion & Connectors

## Overview

Data ingestion is the first step in the Data Cloud pipeline — getting data from source systems into the platform where it can be modeled, resolved, segmented, and activated. Data Cloud supports a range of connectors designed for different source types, data volumes, and latency requirements. Choosing the right connector for each use case is a core skill tested on the Data Cloud Consultant exam.

Each data stream you create in Data Cloud results in a Data Lake Object (DLO) — a raw copy of the source data in Data Cloud's storage. The DLO preserves the original schema and values exactly as they arrived, before any mapping or transformation takes place. From there, DLO fields are mapped to Data Model Objects for use in the rest of the platform.

Understanding the difference between batch and real-time (streaming) ingestion is critical. Batch connectors (S3, scheduled CRM sync) ingest data on a schedule; streaming connectors (Ingestion API) push data in near real-time. The right choice depends on how time-sensitive the use case is.

## Key Concepts

### CRM Connector
The native connector for Salesforce CRM orgs (Connected Orgs). Standard objects such as Contact, Lead, Account, Opportunity, Case, and Campaign are available immediately. The CRM Connector supports both full refresh (replace all data) and incremental refresh (new/changed records only). Incremental is preferred for large orgs.

### Amazon S3 Connector
Batch connector that reads files deposited in an S3 bucket on a schedule. Supported file formats: **CSV, Parquet, and JSON**. Files must follow a defined folder structure and naming convention. Best for large-volume historical data or nightly data warehouse exports.

### Ingestion API
Real-time HTTP-based connector for custom applications. Accepts **HTTP POST** requests with JSON payloads. Supports **upsert** (insert or update based on primary key) and **delete** operations. Ideal for mobile apps, web events, IoT streams, and any scenario requiring low-latency ingestion. Requires an API key for authentication.

### Marketing Cloud Connector
Connects to a Marketing Cloud org to ingest contact data, email engagement events (opens, clicks), journey interactions, and subscriber data. Enables bi-directional data sharing between Marketing Cloud and Data Cloud.

### MuleSoft Connector
Uses MuleSoft Anypoint Platform to connect to virtually any external system or API. Best when complex data transformation or enterprise integration patterns are required before data reaches Data Cloud.

### Refresh Modes
- **Full Refresh**: Replaces all records in the DLO with the complete current export from the source. Safe but expensive for large datasets.
- **Incremental Refresh**: Appends only new or modified records since the last run. Efficient but does not automatically propagate hard deletes.

## How It Works

1. Navigate to Data Cloud → Data Streams → New
2. Select the connector type (CRM, S3, Ingestion API, etc.)
3. Authenticate and configure source settings (bucket, object, API endpoint)
4. Select which objects or data entities to ingest
5. Map source fields during setup or after, in the DLO view
6. Configure refresh schedule (for batch) or receive the API endpoint (for Ingestion API)
7. Activate the data stream — a DLO is created and ingestion begins

## Hands-On Implementation Notes

- **CRM Connector**: After connecting the org, select the CRM object (e.g., Contact), choose fields to include, set refresh mode and schedule
- **S3 Connector**: Enter bucket name, region, and credentials; specify folder path and file naming pattern; select format (CSV/Parquet/JSON)
- **Ingestion API**: Data Cloud generates an endpoint URL and credential; use these in your application's POST request; test with Postman before connecting live traffic
- **Deleted records**: Ingestion API supports a `delete` operation in the payload; S3 and CRM Connector do not automatically remove deleted records in incremental mode — use full refresh or a soft-delete flag field

## Important Exam Details

- S3 supported formats: **CSV, Parquet, JSON** (not Excel, XML, Avro, or ORC)
- Ingestion API method: **HTTP POST** with JSON body
- Ingestion API supports **upsert and delete** operations
- Incremental refresh does **NOT** propagate hard deletes — a common exam trap
- CRM Connector standard objects are available without custom configuration; custom objects require selection
- Each data stream creates exactly **one DLO**
- Data stream categories: **Profile, Engagement, Other** — assigned during data stream creation

## Common Mistakes & Exam Traps

- **S3 = batch only**: S3 is a scheduled batch connector; it cannot do real-time streaming
- **Ingestion API ≠ bulk file upload**: Ingestion API is for programmatic real-time push; bulk file loading is done via S3
- **Incremental refresh and deletes**: Incremental does not delete records from Data Cloud when they are deleted from the source
- **CRM Connector is not real-time**: Even with the CRM Connector, there is a sync delay — it is near-real-time at best, not instant
- **One DLO per stream**: You cannot combine multiple sources into one DLO — each stream gets its own DLO

## Official Documentation

- [Data Streams Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_stream_overview.htm)
- [Ingestion API](https://help.salesforce.com/s/articleView?id=sf.c360_a_ingestion_api.htm)
- [Amazon S3 Connector](https://help.salesforce.com/s/articleView?id=sf.c360_a_s3_connector.htm)
- [CRM Connector](https://help.salesforce.com/s/articleView?id=sf.c360_a_connect_an_org.htm)
- [Marketing Cloud Connector](https://help.salesforce.com/s/articleView?id=sf.c360_a_mc_connector.htm)
