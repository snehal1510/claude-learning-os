# Data Cloud Architecture & Setup

## Overview

Salesforce Data Cloud (formerly Customer Data Platform / CDP) is Salesforce's real-time data platform that ingests, unifies, and activates customer data from any source across the entire Salesforce ecosystem. It operates as a distinct platform layered on top of — and integrated with — Salesforce CRM, Marketing Cloud, and other Salesforce clouds via the Einstein 1 Platform.

Data Cloud's core architectural promise is the Unified Profile: by pulling data from every touchpoint (CRM, ecommerce, mobile, marketing), resolving identity across those sources, and making the result available for segmentation and activation in real-time, it enables truly connected customer experiences. Understanding its architecture is the foundation for every other Data Cloud topic.

The platform was rebranded from Salesforce CDP (Customer Data Platform) to Data Cloud in 2023, reflecting its evolution from a purely marketing-focused tool to a broader real-time data platform that serves sales, service, commerce, and AI use cases.

## Key Concepts

### Data Spaces
Data Spaces are logical partitions within a single Data Cloud org. They allow a company with multiple brands, regions, or business units to maintain isolated data governance while sharing one org infrastructure. Each Data Space has its own data streams, DMOs, segments, and activation targets. Records in one Data Space are not visible in another unless explicitly shared.

### The Data Pipeline Hierarchy
Data flows through four layers in sequence:
1. **Data Stream** — the ingestion pipeline connecting a source (CRM, S3, API) to Data Cloud
2. **Data Lake Object (DLO)** — auto-created raw storage layer; one DLO per data stream; holds data exactly as it arrived
3. **Data Model Object (DMO)** — curated, standardized objects; you map DLO fields to DMO fields for use in segmentation and identity resolution
4. **Unified Individual** — the consolidated profile created by identity resolution; the end-state of all ingestion and matching work

### Connected Org
A Connected Org is a Salesforce CRM org that has been linked to Data Cloud. Once connected, the built-in CRM Connector makes standard CRM objects (Contact, Lead, Account, Opportunity, Case) available for data stream creation without custom development.

### Permission Sets
Data Cloud has three core permission sets:
- **Data Cloud Admin** — full configuration rights (data streams, identity resolution, activation targets, permission management)
- **Data Cloud User** — read/write access to segments and profiles; cannot configure infrastructure
- **Data Cloud Viewer** — read-only access to profiles, segments, and dashboards

## How It Works

1. An org administrator enables Data Cloud from Setup and provisions the platform
2. Permission sets are assigned to appropriate users (Admin, User, Viewer)
3. Data Spaces are created to partition data by brand or business unit (optional, but recommended for multi-brand orgs)
4. The CRM org is registered as a Connected Org to enable the CRM Connector
5. External data sources (S3, APIs) are configured as additional connectors
6. Data streams are created for each source, generating DLOs and forming the input to the data pipeline

## Hands-On Implementation Notes

- Enable Data Cloud in Setup → Data Cloud → Getting Started
- Assign the **Data Cloud Admin** permission set via Setup → Permission Sets before attempting any configuration
- Create Data Spaces at Setup → Data Cloud → Data Spaces; define a name and optional description
- Register a Connected Org at Setup → Data Cloud → Connected Orgs; authenticate with the target CRM org credentials
- Data Cloud is provisioned as a separate namespace within your Salesforce org — navigate to Data Cloud from the App Launcher

## Important Exam Details

- **Predecessor name**: Salesforce Customer Data Platform (CDP) — rebranded to Data Cloud in 2023
- **Data Space default**: Every Data Cloud org has a default Data Space; additional ones must be created manually
- **CRM Connector**: uses the Connected Org feature; no managed package or custom API required
- **Permission set hierarchy**: Admin > User > Viewer — only Admin can configure data streams, identity resolution, activation targets
- **Pipeline order**: Data Stream → DLO → DMO → Unified Individual (exam often tests this sequence)
- Data Cloud is part of the **Einstein 1 Platform**, alongside Sales Cloud, Service Cloud, Marketing Cloud

## Common Mistakes & Exam Traps

- **Confusing DLO and DMO**: DLO = raw auto-created layer; DMO = curated, manually mapped layer used for segmentation
- **Assuming Data Cloud merges orgs**: Data Cloud connects to CRM orgs but does not merge them — they remain separate systems
- **Forgetting permission sets**: Salesforce Admin does not automatically grant Data Cloud Admin rights
- **Data Spaces vs Orgs**: Multi-brand isolation uses Data Spaces within one org, NOT separate Data Cloud orgs
- **CDP = Data Cloud**: Questions may use either name; they refer to the same product

## Official Documentation

- [Salesforce Data Cloud Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_cloud.htm)
- [Set Up Data Cloud](https://help.salesforce.com/s/articleView?id=sf.c360_a_setup_data_cloud.htm)
- [Data Cloud Permission Sets](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_cloud_permissions.htm)
- [Connect a Salesforce CRM Org](https://help.salesforce.com/s/articleView?id=sf.c360_a_connect_an_org.htm)
- [Data Spaces](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_spaces.htm)
