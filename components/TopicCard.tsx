import Link from "next/link"
import type { Topic } from "@/types"

interface Props {
  topic: Topic
  certId: string
  accuracy: number | null
}

export default function TopicCard({ topic, certId, accuracy }: Props) {
  const accColor =
    accuracy == null ? "var(--muted)" : accuracy >= 80 ? "var(--accent)" : accuracy >= 60 ? "var(--gold)" : "#e53e3e"

  return (
    <Link
      href={`/study/${certId}/${topic.id}`}
      className="block rounded-lg p-5 transition-all hover:scale-[1.005]"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", textDecoration: "none", color: "var(--foreground)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-bold text-base leading-snug tracking-tight">{topic.label}</h3>
        <span className="font-mono text-[11px] shrink-0 mt-0.5" style={{ color: "var(--accent)", letterSpacing: "0.05em" }}>
          {"●".repeat(topic.difficulty)}{"○".repeat(5 - topic.difficulty)}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)", maxWidth: "52ch" }}>
        {topic.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
          {topic.questionCount} questions
        </span>
        <span className="font-mono text-[11px] font-medium" style={{ color: accColor }}>
          {accuracy != null ? `${accuracy}% accuracy` : "Not started"}
        </span>
      </div>
    </Link>
  )
}
