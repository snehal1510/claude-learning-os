import { notFound } from "next/navigation"
import Link from "next/link"
import { readFileSync } from "fs"
import { join } from "path"
import { getCertification, getTopic, CERTIFICATIONS } from "@/lib/questions"
import StudyGuide from "@/components/StudyGuide"

interface Props {
  params: Promise<{ certId: string; topicId: string }>
}

export async function generateStaticParams() {
  return CERTIFICATIONS.flatMap((c) =>
    c.topics.map((t) => ({ certId: c.id, topicId: t.id }))
  )
}

export default async function LearnPage({ params }: Props) {
  const { certId, topicId } = await params
  const cert = getCertification(certId)
  const topic = getTopic(certId, topicId)
  if (!cert || !topic) notFound()

  let guideContent = ""
  try {
    const guidePath = join(process.cwd(), "content", "guides", certId, `${topicId}.md`)
    guideContent = readFileSync(guidePath, "utf-8")
  } catch {
    guideContent = `# ${topic.label}\n\nStudy guide coming soon.`
  }

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
        <Link href={`/study/${certId}/${topicId}`} className="hover:underline" style={{ color: "var(--muted)" }}>
          {topic.label}
        </Link>
        <span>›</span>
        <span style={{ color: accentColor }}>Study Guide</span>
      </div>

      <div className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Study Guide · {cert.shortLabel}
        </p>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
            {topic.label}
          </h1>
          <Link
            href={`/study/${certId}/${topicId}/quiz`}
            className="font-mono text-[11px] px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition-opacity"
            style={{ background: accentColor, color: "#fff", textDecoration: "none" }}
          >
            Practice Questions →
          </Link>
        </div>
      </div>

      <StudyGuide content={guideContent} topicLabel={topic.label} />

      <div className="mt-12 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
        <Link
          href={`/study/${certId}/${topicId}`}
          className="font-mono text-[11px] hover:underline"
          style={{ color: "var(--muted)" }}
        >
          ← Back to topic
        </Link>
        <Link
          href={`/study/${certId}/${topicId}/quiz`}
          className="font-mono text-[11px] font-medium hover:underline"
          style={{ color: accentColor }}
        >
          Start practice quiz →
        </Link>
      </div>
    </div>
  )
}
