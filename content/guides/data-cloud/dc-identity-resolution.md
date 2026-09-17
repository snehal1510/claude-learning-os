# Identity Resolution

## Overview

Identity resolution is the process by which Data Cloud determines that multiple records from different source systems represent the same real-world person, and then consolidates them into a single Unified Individual profile. It is the core differentiator of a Customer Data Platform — without identity resolution, you have siloed data; with it, you have a true 360-degree customer view.

The challenge identity resolution solves is fundamental: a customer may appear as a Contact in your CRM org, a subscriber in Marketing Cloud, a registered user in your ecommerce platform, and an event attendee in a third-party system. Each record may have slightly different data — different name spellings, multiple email addresses, inconsistent phone formats. Identity resolution applies rule-based matching to link these records and then creates a consolidated profile with reconciled field values.

Data Cloud's identity resolution is configurable via rulesets — you define match rules (how to find records that belong to the same person) and reconciliation rules (which value wins when matched records disagree). This makes the process transparent and auditable, unlike black-box probabilistic matching systems.

## Key Concepts

### The Three Stages

**1. Match** — Apply match rules to identify Individual records that likely belong to the same real-world person. Each match rule specifies a matching criterion (e.g., exact email match, exact phone match, fuzzy name + address match). Records are grouped into "match groups" when they share matching attributes.

**2. Reconcile** — When matched records have conflicting values for the same field (e.g., different spellings of a first name), reconciliation rules determine which value to use in the unified profile. Options include:
- **Most Frequent** — the value that appears most often across matched records
- **Most Recent** — the value from the most recently updated record
- **Source Priority** — the value from the highest-ranked source system

**3. Unify** — A Unified Individual record is created that consolidates all matched source records. The Unified Individual's fields use the reconciled values, and it maintains links to all contributing Individual records via the identity graph.

### Match Rule Types
- **Exact Email** — matches records sharing an identical email address (case-insensitive)
- **Exact Phone** — matches on phone number after normalization
- **Fuzzy Name + Address** — matches on similar names and addresses, tolerating typos
- **Custom** — user-defined matching criteria

### Contact Point Objects
Identity resolution works through Contact Point objects — Contact Point Email, Contact Point Phone, Contact Point Address. These objects store the actual identifier values (email addresses, phone numbers) and are related to Individual records. Match rules compare Contact Point values across Individual records to determine matches.

### Unified Individual and Identity Graph
After matching and reconciliation, a Unified Individual is created. The identity graph tracks which Individual records contributed to each Unified Individual — this is visible in Profile Explorer and is essential for understanding how the unification occurred.

## How It Works

1. Navigate to Data Cloud → Identity Resolution → New Ruleset
2. Add match rules in priority order — higher-priority rules are evaluated first
3. Add reconciliation rules for each field on the Individual DMO that may have conflicting values
4. Run the ruleset (manual trigger or scheduled)
5. Review results: match counts, unresolved records, Unified Individual count
6. View individual results in Profile Explorer

## Hands-On Implementation Notes

- **Individual DMO must be populated** before identity resolution can run — ensure your data streams map to the Individual standard DMO
- **Contact Point DMOs must be mapped** — Contact Point Email must be populated with a belongs-to relationship to Individual for email matching to work
- Go to Data Cloud → Identity Resolution → select or create a ruleset
- Add match rules: select rule type (Email, Phone, etc.), specify the Contact Point DMO field
- Add reconciliation rules: for each Individual field, select Most Frequent, Most Recent, or Source Priority
- Use **Profile Explorer** after running to verify specific records are correctly unified

## Important Exam Details

- **Sequence**: Match → Reconcile → Unify (in that exact order)
- **Match rule types**: Exact Email, Exact Phone, Fuzzy Name, Custom
- **Reconciliation rule types**: Most Frequent, Most Recent, Source Priority
- **Unified Individual** is created BY identity resolution — it does not exist until the ruleset runs
- Contact Point Email must be in a **belongs-to relationship** with Individual for email matching to work
- **Profile Explorer** is used to view Unified Profiles and identity graphs post-resolution
- Identity resolution can be triggered **manually or on a schedule**
- Changing match rules and re-running resolution will regenerate Unified Individuals

## Common Mistakes & Exam Traps

- **Reconcile before Match**: The exam sometimes presents the steps out of order — always Match → Reconcile → Unify
- **Individual ≠ Unified Individual**: Individual is the source record; Unified Individual is the merged output
- **Contact Points are required**: Email matching will not work if Contact Point Email is not populated and linked to Individual
- **Unified Individuals are recreated**: They are not permanent static records — re-running the ruleset with different rules regenerates them
- **Match rules are ordered**: If a record matches on rule 1, it is grouped; rule 2 and lower are also evaluated. Priority affects tie-breaking, not exclusivity.

## Official Documentation

- [Identity Resolution Overview](https://help.salesforce.com/s/articleView?id=sf.c360_a_identity_resolution.htm)
- [Match Rules](https://help.salesforce.com/s/articleView?id=sf.c360_a_match_rules.htm)
- [Reconciliation Rules](https://help.salesforce.com/s/articleView?id=sf.c360_a_reconciliation_rules.htm)
- [Profile Explorer](https://help.salesforce.com/s/articleView?id=sf.c360_a_profile_explorer.htm)
