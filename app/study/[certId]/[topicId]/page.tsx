import { notFound } from "next/navigation"
import Link from "next/link"
import { getCertification, getTopic, loadTopicQuestions, CERTIFICATIONS } from "@/lib/questions"

interface Props {
  params: Promise<{ certId: string; topicId: string }>
}

export async function generateStaticParams() {
  return CERTIFICATIONS.flatMap((c) =>
    c.topics.map((t) => ({ certId: c.id, topicId: t.id }))
  )
}

export default async function TopicPage({ params }: Props) {
  const { certId, topicId } = await params
  const cert = getCertification(certId)
  const topic = getTopic(certId, topicId)
  if (!cert || !topic) notFound()

  const questions = await loadTopicQuestions(certId, topicId)
  const accentColor = cert.color === "gold" ? "var(--gold)" : "var(--accent)"

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 w-full">
      <div className="flex items-center gap-2 mb-8 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline" style={{ color: "var(--muted)" }}>Home</Link>
        <span>›</span>
        <Link href={`/study/${certId}`} className="hover:underline" style={{ color: "var(--muted)" }}>
          {cert.shortLabel}
        </Link>
        <span>›</span>
        <span style={{ color: accentColor }}>{topic.label}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
            {topic.label}
          </h1>
          <span className="font-mono text-sm shrink-0 mt-1" style={{ color: accentColor }}>
            {"●".repeat(topic.difficulty)}{"○".repeat(5 - topic.difficulty)}
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)", maxWidth: "55ch" }}>
          {topic.description}
        </p>

        {topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-1 rounded"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/learn/${certId}/${topicId}`}
          className="font-mono text-[11px] hover:underline"
          style={{ color: accentColor }}
        >
          Read Study Guide →
        </Link>
      </div>

      <div
        className="rounded-xl p-6 mb-8"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Question Bank
          </p>
          <span className="font-mono text-[11px]" style={{ color: accentColor }}>
            {questions.length} questions
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {questions.slice(0, 3).map((q, i) => (
            <div
              key={q.id}
              className="flex items-start gap-3 rounded-md px-3 py-2.5 text-sm"
              style={{ background: "var(--surface-2)" }}
            >
              <span className="font-mono text-[10px] shrink-0 mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                Q{i + 1}
              </span>
              <span style={{ color: "var(--foreground)" }}>
                {q.stem.slice(0, 95)}{q.stem.length > 95 ? "…" : ""}
              </span>
            </div>
          ))}
          {questions.length > 3 && (
            <p className="text-xs mt-1 text-center" style={{ color: "var(--muted)" }}>
              +{questions.length - 3} more questions
            </p>
          )}
        </div>
      </div>

      <Link
        href={`/study/${certId}/${topicId}/quiz`}
        className="flex items-center justify-center w-full py-3.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ background: accentColor, textDecoration: "none" }}
      >
        Start Study Session — {questions.length} Questions
      </Link>

      <p className="text-center text-xs mt-3" style={{ color: "var(--muted)" }}>
        Questions shuffled each session · Explanations after every answer · AI discussion available
      </p>
    </div>
  )
}
