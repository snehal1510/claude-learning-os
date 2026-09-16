import type { TopicQuestions, Question, Certification, Topic } from "@/types"

export const CERTIFICATIONS: Certification[] = [
  {
    id: "claude-associate",
    label: "Claude Associate – Foundations",
    shortLabel: "Associate",
    description: "Covers Claude model family, prompting fundamentals, the Messages API, safety principles, and common use cases.",
    mode: "exam",
    color: "teal",
    examGuideUrl: "https://www.anthropic.com/certification",
    examFormat: { questionCount: 60, timeMinutes: 90, passingScore: 70 },
    domains: [
      { label: "Claude Capabilities & Model Family", weight: 20 },
      { label: "Prompting Fundamentals", weight: 25 },
      { label: "The Messages API", weight: 20 },
      { label: "Safety & Responsible AI", weight: 20 },
      { label: "Use Cases & Limitations", weight: 15 },
    ],
    topics: [
      { id: "claude-models", label: "Claude Model Family", description: "Haiku, Sonnet, and Opus — capabilities, use cases, and tradeoffs across the Claude model tiers.", difficulty: 2, questionCount: 10, tags: ["models", "capabilities"] },
      { id: "prompting-basics", label: "Prompting Fundamentals", description: "Prompt structure, instruction clarity, examples, and chain-of-thought techniques.", difficulty: 2, questionCount: 10, tags: ["prompting"] },
      { id: "messages-api-basics", label: "Messages API Basics", description: "Request structure, required parameters, role turns, and response format.", difficulty: 2, questionCount: 8, tags: ["api"] },
      { id: "safety-basics", label: "Safety & Responsible AI", description: "Constitutional AI, harm avoidance, limitations, and appropriate use.", difficulty: 2, questionCount: 8, tags: ["safety"] },
      { id: "use-cases", label: "Use Cases & Limitations", description: "When to use Claude, known limitations, and common application patterns.", difficulty: 1, questionCount: 6, tags: ["use-cases"] },
    ],
  },
  {
    id: "claude-developer",
    label: "Claude Developer – Foundations",
    shortLabel: "Developer",
    description: "Advanced Messages API, tool use and function calling, streaming, prompt caching, and context window management.",
    mode: "exam",
    color: "teal",
    examGuideUrl: "https://www.anthropic.com/certification",
    examFormat: { questionCount: 65, timeMinutes: 100, passingScore: 72 },
    domains: [
      { label: "Messages API — Advanced", weight: 25 },
      { label: "Tool Use & Function Calling", weight: 25 },
      { label: "Streaming", weight: 15 },
      { label: "Prompt Caching", weight: 15 },
      { label: "Context & Multi-turn Conversations", weight: 20 },
    ],
    topics: [
      { id: "messages-api-advanced", label: "Messages API — Advanced", description: "Full parameter reference, content blocks, stop sequences, sampling params, and usage metadata.", difficulty: 3, questionCount: 10, tags: ["api"] },
      { id: "tool-use", label: "Tool Use & Function Calling", description: "Defining tools, tool_choice, tool_use blocks, tool_result messages, and multi-step tool loops.", difficulty: 4, questionCount: 10, tags: ["tools"] },
      { id: "streaming", label: "Streaming", description: "Server-sent events, event types, delta accumulation, and streaming tool use.", difficulty: 3, questionCount: 8, tags: ["streaming"] },
      { id: "prompt-caching", label: "Prompt Caching", description: "cache_control, cache TTL, input token pricing, and cache hit/miss behavior.", difficulty: 3, questionCount: 8, tags: ["caching"] },
      { id: "context-management", label: "Context & Multi-turn", description: "Context window limits, conversation history management, and memory patterns.", difficulty: 3, questionCount: 8, tags: ["context"] },
    ],
  },
  {
    id: "claude-architect",
    label: "Claude Certified Architect – Foundations",
    shortLabel: "Architect",
    description: "Multi-agent systems, RAG and knowledge retrieval, cost optimization, safety at scale, and system design patterns.",
    mode: "exam",
    color: "gold",
    examGuideUrl: "https://www.anthropic.com/certification",
    examFormat: { questionCount: 70, timeMinutes: 110, passingScore: 75 },
    domains: [
      { label: "Multi-Agent Systems", weight: 25 },
      { label: "RAG & Knowledge Systems", weight: 25 },
      { label: "Cost & Performance Optimization", weight: 20 },
      { label: "Safety & Alignment at Scale", weight: 15 },
      { label: "System Design Patterns", weight: 15 },
    ],
    topics: [
      { id: "multi-agent", label: "Multi-Agent Systems", description: "Orchestrator/subagent patterns, agent handoffs, parallelism, and coordination strategies.", difficulty: 4, questionCount: 10, tags: ["multi-agent"] },
      { id: "rag-systems", label: "RAG & Knowledge Systems", description: "Document chunking, embedding strategies, retrieval, re-ranking, and grounding Claude responses.", difficulty: 4, questionCount: 10, tags: ["rag"] },
      { id: "cost-optimization", label: "Cost & Performance Optimization", description: "Model selection tradeoffs, prompt caching ROI, batching, and token budgeting.", difficulty: 3, questionCount: 8, tags: ["cost", "performance"] },
      { id: "safety-alignment-scale", label: "Safety & Alignment at Scale", description: "Evaluation frameworks, red-teaming, monitoring, and responsible deployment.", difficulty: 4, questionCount: 8, tags: ["safety", "alignment"] },
      { id: "system-design-patterns", label: "System Design Patterns", description: "Agentic loop design, error recovery, fallback strategies, and reliability patterns.", difficulty: 4, questionCount: 8, tags: ["architecture"] },
    ],
  },
]

export function getCertification(certId: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.id === certId)
}

export function getTopic(certId: string, topicId: string): Topic | undefined {
  return getCertification(certId)?.topics.find((t) => t.id === topicId)
}

const questionCache = new Map<string, TopicQuestions[]>()

export async function loadCertQuestions(certId: string): Promise<TopicQuestions[]> {
  if (questionCache.has(certId)) return questionCache.get(certId)!

  const fileMap: Record<string, () => Promise<TopicQuestions[]>> = {
    "claude-associate": () => import("@/content/questions/claude-associate.json").then((m) => m.default as unknown as TopicQuestions[]),
    "claude-developer": () => import("@/content/questions/claude-developer.json").then((m) => m.default as unknown as TopicQuestions[]),
    "claude-architect": () => import("@/content/questions/claude-architect.json").then((m) => m.default as unknown as TopicQuestions[]),
  }

  if (!fileMap[certId]) return []
  const data = await fileMap[certId]()
  questionCache.set(certId, data)
  return data
}

export async function loadTopicQuestions(certId: string, topicId: string): Promise<Question[]> {
  const all = await loadCertQuestions(certId)
  const bank = all.find((b) => b.topic === topicId)
  return bank?.questions ?? []
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const STATS_KEY = "claude_topic_stats"

export interface LocalTopicStats {
  certId: string
  topicId: string
  attempts: number
  correct: number
  lastAttempted: string
}

export function getLocalStats(): LocalTopicStats[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) ?? "[]")
  } catch {
    return []
  }
}

export function saveLocalAnswer(certId: string, topicId: string, wasCorrect: boolean) {
  const stats = getLocalStats()
  const idx = stats.findIndex((s) => s.certId === certId && s.topicId === topicId)
  if (idx >= 0) {
    stats[idx].attempts++
    if (wasCorrect) stats[idx].correct++
    stats[idx].lastAttempted = new Date().toISOString()
  } else {
    stats.push({ certId, topicId, attempts: 1, correct: wasCorrect ? 1 : 0, lastAttempted: new Date().toISOString() })
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export function getTopicAccuracy(certId: string, topicId: string): number | null {
  const stat = getLocalStats().find((s) => s.certId === certId && s.topicId === topicId)
  if (!stat || stat.attempts === 0) return null
  return Math.round((stat.correct / stat.attempts) * 100)
}
