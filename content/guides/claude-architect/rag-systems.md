# RAG Systems

## Overview

Retrieval Augmented Generation (RAG) solves one of Claude's fundamental limitations: its training knowledge has a cutoff date, and its context window can't hold an entire knowledge base. RAG connects Claude to external, up-to-date document stores, retrieving only the relevant chunks for each query.

The Architect exam tests RAG at a system design level: when to use it, how to architect the pipeline, chunking and embedding strategies, and failure modes.

## Key Concepts

### The RAG Pipeline

```
User Query
    ↓
Embed Query → Vector
    ↓
Vector DB Similarity Search → Top-K Chunks
    ↓
Inject Chunks into Claude's Context
    ↓
Claude Generates Grounded Answer
```

Five stages: embed query, retrieve, rerank (optional), inject, generate.

### Embedding and Vector Search

Documents are split into chunks and embedded (converted to high-dimensional vectors) using an embedding model. These vectors are stored in a vector database. At query time, the query is embedded with the same model, and the database finds chunks whose vectors are nearest (most semantically similar).

Common embedding models: OpenAI text-embedding-3, Cohere embed, open-source sentence-transformers.

Common vector databases: Pinecone, Weaviate, Qdrant, pgvector (PostgreSQL extension).

Similarity metrics: cosine similarity (most common), dot product, Euclidean distance.

### Chunking Strategies

Chunking strategy significantly impacts retrieval quality:

| Strategy | Description | Best For |
|----------|-------------|----------|
| Fixed-size | Split by character/token count | Simple, fast baseline |
| Sentence | Split by sentence boundaries | Conversational content |
| Paragraph | Split at paragraph breaks | Articles, documentation |
| Semantic | Split when topic shifts | Mixed-topic documents |
| Hierarchical | Parent chunks → child chunks | Large documents |

**Overlap**: Adding 10-20% overlap between adjacent chunks prevents relevant context from being split across chunk boundaries.

### Hybrid Search

Pure vector search misses exact keyword matches. Hybrid search combines:
- **Dense retrieval** (vector similarity) — semantic meaning
- **Sparse retrieval** (BM25/keyword) — exact keyword matches

Results are merged and re-ranked. Generally outperforms either method alone.

### Reranking

After initial retrieval (top-K chunks), a reranker model scores each chunk for relevance to the query. Top-N of the re-ranked results are used. Rerankers (e.g., Cohere Rerank, cross-encoders) are slower than vector search but more accurate.

### Metadata Filtering

Pre-filter documents before vector search using structured metadata:
- `date >= 2024-01-01` (recency filter)
- `department = "engineering"` (access control)
- `doc_type = "policy"` (category filter)

Reduces search space, improves relevance, enables access control.

### When to Use RAG vs. Fine-tuning vs. Prompt Caching

| Technique | Use When |
|-----------|----------|
| RAG | External, large, frequently-updated knowledge bases |
| Prompt Caching | Large but static context repeated across requests |
| Fine-tuning | Teaching new behavior, style, or format (not new facts) |
| In-context | Small, static document sets that fit in context |

## Important Details

- Embedding model must be the SAME for indexing and querying — mixing models breaks search
- k in top-K is a hyperparameter — start with 3-10, tune based on context window and relevance
- RAG doesn't guarantee accuracy — Claude can still hallucinate if chunks are irrelevant
- Source citations improve trustworthiness: include chunk metadata (doc name, page) with each chunk

## Common Exam Traps

**Trap 1: Fine-tuning teaches new knowledge.** False. Fine-tuning teaches behavior, style, and format. For factual knowledge retrieval, use RAG.

**Trap 2: Larger chunks are always better.** False. Larger chunks include more noise. Smaller chunks are more precise but may lack context. Overlap helps bridge the gap.

**Trap 3: Same embedding model for index and query is optional.** False. You MUST use the same embedding model. Mixing models produces incompatible vector spaces.

**Trap 4: RAG guarantees accuracy.** False. If retrieval returns irrelevant chunks, Claude may generate incorrect answers grounded in bad context.

## Practice Tips

Know the full pipeline sequence and be able to identify where failures occur (bad chunking → poor retrieval; wrong embedding → wrong search results; too few chunks → missing context). For architect questions, justify your chunking strategy and vector database choice for a given scenario.
