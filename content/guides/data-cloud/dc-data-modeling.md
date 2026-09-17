# Data Modeling & DMOs

## Overview

Data modeling in Data Cloud is the process of transforming raw ingested data (stored in Data Lake Objects) into standardized, curated structures (Data Model Objects) that are suitable for identity resolution, segmentation, and activation. This is arguably the most important architectural layer in Data Cloud — if your data model is wrong, everything downstream suffers.

Salesforce provides a standard data model for Data Cloud that mirrors real-world customer data concepts: a person (Individual), their contact points (email, phone, address), their engagements (web visits, email opens), and their transactions (orders, cases). You map your raw source data into these standard DMOs, enabling the platform to understand and unify your data regardless of the source system's original schema.

The distinction between a Data Lake Object and a Data Model Object is one of the most exam-critical concepts in this certification. Exam questions frequently test whether candidates understand that DLOs are auto-created raw staging areas, while DMOs are the curated, purposeful objects you design and configure.

## Key Concepts

### Data Lake Object (DLO)
A DLO is automatically created for every data stream. It holds the raw data exactly as it arrived from the source — same field names, same values, no transformation. DLOs are essentially staging tables. You do not query DLOs for segmentation; they exist purely as the raw input layer before mapping to DMOs.

### Data Model Object (DMO)
A DMO is a curated object that represents a meaningful business entity. Standard DMOs are provided by Salesforce (Individual, Contact Point Email, etc.); custom DMOs can be created for business-specific entities. DMOs are what you segment on, run identity resolution against, and include in activation attribute sets. You populate DMOs by mapping fields from DLOs.

### Standard Data Model Objects
Key standard DMOs to know:
- **Individual** — represents a person (first name, last name, birth date, etc.)
- **Unified Individual** — the merged profile created by identity resolution
- **Contact Point Email** — stores email addresses; has a belongs-to relationship with Individual
- **Contact Point Phone** — stores phone numbers
- **Contact Point Address** — stores physical mailing addresses
- **Sales Order** — represents purchase transactions
- **Case** — represents service cases

### Data Categories
Every DMO is assigned one of three data categories:
- **Profile** — person/entity data (Individual, demographics, preferences)
- **Engagement** — behavioral/interaction data (web visits, email opens, app events)
- **Other** — transactional and other structured data (orders, products, cases)

### Primary Key
Every DMO must have a Primary Key field — a field whose value uniquely identifies each record. During upsert operations, if a record with the matching primary key already exists in the DMO, it is updated; otherwise a new record is inserted. Choosing a stable, globally unique identifier from the source system is critical.

### Relationships
DMO relationships (belongs-to, has-many) allow Segment Builder to traverse related objects. For example, Contact Point Email has a belongs-to relationship with Individual, enabling segmentation filters on email domain while targeting Individual records.

## How It Works

1. After creating a data stream and DLO, navigate to the DLO in Data Cloud
2. Create or select a target DMO (standard or custom)
3. Map each DLO field to its corresponding DMO field — data types must be compatible
4. Designate the Primary Key field on the DMO
5. Assign the data category (Profile, Engagement, or Other)
6. Configure relationships to other DMOs if applicable
7. Activate the mapping — data flows from the DLO into the DMO on the next ingestion run

## Hands-On Implementation Notes

- Navigate to Data Cloud → Data Model to see all DMOs
- To create a custom DMO: Data Cloud → Data Model → New → specify name, category, and fields
- Field mapping is done in the DLO's field mapping view or from the DMO's mapping tab
- Relationship configuration: on the DMO, add a relationship field that references the primary key of the related DMO
- If you change a mapped field's data type, the mapping becomes invalid and must be remapped

## Important Exam Details

- **DLO**: auto-created per data stream; raw data; NOT used for segmentation directly
- **DMO**: manually mapped; curated; used for segmentation, identity resolution, activation
- **Standard DMOs are provided by Salesforce** — you do not need to create Individual, Contact Point Email, etc. from scratch
- **Data categories**: Profile, Engagement, Other — no fourth option
- **Primary Key is set on the DMO**, not the DLO
- Field mapping requires **compatible data types** — field names do not need to match
- **Unmapped DLO fields** are ignored; they stay in the DLO but do not appear in the DMO
- **Belongs-to relationship**: Contact Point Email belongs to Individual (many emails can belong to one Individual)

## Common Mistakes & Exam Traps

- **Segmenting on DLOs**: You segment on DMOs, not DLOs. DLOs are raw staging only.
- **Unified Individual ≠ Individual**: Individual is the source person record; Unified Individual is the merged result of identity resolution — a separate object
- **Assuming all fields auto-map**: Field mapping must be done explicitly. Nothing maps automatically.
- **Transactional data category**: Sales Orders and purchase records belong to "Other", not "Engagement" (which is for behavioral interactions, not transactions)
- **Primary Key uniqueness**: If your source field has duplicate values, the upsert behavior will overwrite records unexpectedly — choose the right unique identifier

## Official Documentation

- [Data Model Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_model.htm)
- [Standard Data Model Objects](https://help.salesforce.com/s/articleView?id=sf.c360_a_standard_data_model.htm)
- [Map Data to DMOs](https://help.salesforce.com/s/articleView?id=sf.c360_a_map_data.htm)
- [Create Custom DMOs](https://help.salesforce.com/s/articleView?id=sf.c360_a_create_dmo.htm)
