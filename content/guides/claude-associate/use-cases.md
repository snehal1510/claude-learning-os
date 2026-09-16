# Use Cases & Limitations

## Overview

Claude excels at text-based tasks: understanding, generating, analyzing, summarizing, and transforming written content. Its large context window makes it particularly powerful for document-heavy workflows. However, Claude has inherent limitations — a training cutoff, no native access to real-time data, and no ability to execute code or take physical actions without additional integrations.

Understanding both what Claude does well and where it falls short is essential for designing appropriate applications and for answering exam questions about appropriate vs. inappropriate deployment scenarios.

## Key Concepts

### What Claude Excels At

**Text generation and editing**: Drafting, rewriting, summarizing, translating, explaining in different styles.

**Code generation and review**: Writing, debugging, explaining, and refactoring code in many languages. Claude can identify bugs through static analysis, suggest fixes, and explain logic — without executing code.

**Document analysis**: Claude's 200K context window allows processing entire books or large document sets in a single request — a significant advantage for legal, financial, and technical document review.

**Customer service automation**: Answering FAQs, drafting responses, summarizing tickets, triaging and routing support requests.

**Content moderation assistance**: Classifying content against guidelines, flagging potential violations for human review.

**Data extraction**: Pulling structured information from unstructured text (extracting entities, dates, relationships).

### The Knowledge Cutoff Limitation

Like all LLMs, Claude has a training data cutoff. It doesn't know about events after that date.

**Impact**: Claude cannot:
- Report current news, stock prices, or weather
- Know about software releases, law changes, or company events after its cutoff
- Browse the internet natively

**Solution**: Use RAG (Retrieval Augmented Generation) to provide current documents, or use tool use to access live data APIs.

### What Claude Cannot Do (Without Additional Tools)

- **Execute code**: Claude analyzes code as text. No code interpreter by default.
- **Access real-time data**: No internet browsing, no live database queries.
- **Physical world interactions**: Claude works with text; it cannot control hardware or send actual communications.
- **Retain memory between conversations**: Each API call is stateless. No built-in persistent memory.

### When NOT to Use Claude as Sole Decision-Maker

Claude should assist humans, not replace human judgment in high-stakes scenarios:
- **Medical**: Provide information, not diagnoses used in isolation
- **Legal**: Explain concepts, not provide binding legal advice
- **Safety-critical autonomous systems**: Aviation, nuclear, medical devices — require certified human oversight
- **Financial**: Support analysis, not autonomous trading decisions

## Important Details

- Claude can explain code but cannot run it without a code interpreter tool
- Knowledge cutoff applies to all domains (news, tech, law, science)
- For sensitive domains (medical, legal): be helpful AND note limitations AND recommend professionals
- Claude cannot verify user identity — claims don't unlock special capabilities

## Common Exam Traps

**Trap 1: "Claude can access the internet."** False by default. Real-time data requires tool use with a web search or API tool.

**Trap 2: "Claude can run the code it writes."** False without a code interpreter tool. Analysis only.

**Trap 3: "Claude's knowledge cutoff means it knows nothing."** False. The cutoff limits RECENT knowledge. Claude has extensive knowledge of everything up to the cutoff date.

**Trap 4: "Claude should be the final decision-maker for medical/legal questions."** False. Claude assists and informs; professional judgment is required for high-stakes decisions.

## Practice Tips

Exam questions about use cases often present a scenario and ask if Claude is appropriate, or what limitation applies. Always check:
1. Does it require real-time data? (needs tools)
2. Does it require code execution? (needs interpreter tool)
3. Is it a high-stakes autonomous decision? (needs human oversight)
4. Is it text-based analysis? (Claude can handle it)
