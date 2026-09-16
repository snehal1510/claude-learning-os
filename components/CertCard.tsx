import Link from "next/link"
import type { Certification } from "@/types"

interface Props {
  cert: Certification
  accuracy: number | null
}

const MODE_LABELS: Record<string, string> = {
  exam: "Certification Exam",
  trailhead: "Learning Path",
  accreditation: "Accreditation",
}

export default function CertCard({ cert, accuracy }: Props) {
  const totalQuestions = cert.topics.reduce((s, t) => s + t.questionCount, 0)
  const isGold = cert.color === "gold"

  return (
    <Link
      href={`/study/${cert.id}`}
      className="block rounded-lg p-5 transition-all hover:scale-[1.01]"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        textDecoration: "none",
        color: "var(--foreground)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-lg"
        style={{ background: isGold ? "var(--gold)" : "var(--accent)" }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <span
            className="font-mono text-[10px] font-medium tracking-widest uppercase"
            style={{ color: isGold ? "var(--gold)" : "var(--accent)" }}
          >
            {MODE_LABELS[cert.mode] ?? cert.mode}
          </span>
          {accuracy != null && (
            <span
              className="font-mono text-[10px] font-medium"
              style={{ color: accuracy >= 80 ? "var(--accent)" : accuracy >= 60 ? "var(--gold)" : "var(--muted)" }}
            >
              {accuracy}% accuracy
            </span>
          )}
        </div>

        <h2 className="text-base font-bold leading-snug mb-2 tracking-tight" style={{ color: "var(--foreground)" }}>
          {cert.label}
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)", maxWidth: "48ch" }}>
          {cert.description}
        </p>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          <span>{cert.topics.length} topics</span>
          <span>·</span>
          <span>{totalQuestions} questions</span>
          {cert.examFormat && (
            <>
              <span>·</span>
              <span>{cert.examFormat.questionCount}Q / {cert.examFormat.timeMinutes}min</span>
            </>
          )}
        </div>

        <div className="mt-4 text-sm font-medium" style={{ color: isGold ? "var(--gold)" : "var(--accent)" }}>
          Start Studying →
        </div>
      </div>
    </Link>
  )
}
