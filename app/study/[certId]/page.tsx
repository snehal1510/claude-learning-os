import { notFound } from "next/navigation"
import Link from "next/link"
import { getCertification, CERTIFICATIONS } from "@/lib/questions"
import TopicCard from "@/components/TopicCard"

interface Props {
  params: Promise<{ certId: string }>
}

export async function generateStaticParams() {
  return CERTIFICATIONS.map((c) => ({ certId: c.id }))
}

export default async function CertPage({ params }: Props) {
  const { certId } = await params
  const cert = getCertification(certId)
  if (!cert) notFound()

  const isGold = cert.color === "gold"
  const accentColor = isGold ? "var(--gold)" : "var(--accent)"

  const MODE_LABELS: Record<string, string> = {
    exam: "Certification Exam",
    trailhead: "Learning Path",
    accreditation: "Accreditation",
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 w-full">
      <div className="flex items-center gap-2 mb-8 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline" style={{ color: "var(--muted)" }}>Home</Link>
        <span>›</span>
        <span style={{ color: accentColor }}>{cert.shortLabel}</span>
      </div>

      <div className="mb-8 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          {MODE_LABELS[cert.mode]}
        </p>
        <h1 className="text-2xl font-black tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
          {cert.label}
        </h1>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
          {cert.description}
        </p>

        {cert.examFormat && (
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Questions", value: cert.examFormat.questionCount },
              { label: "Time Limit", value: `${cert.examFormat.timeMinutes} min` },
              { label: "Passing Score", value: `${cert.examFormat.passingScore}%` },
            ].map((item) => (
              <div key={item.label} className="rounded-md px-4 py-2.5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="font-mono text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--muted)" }}>{item.label}</p>
                <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {cert.domains.length > 0 && (
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
            Exam Domains
          </p>
          <div className="flex flex-col gap-2">
            {cert.domains.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-sm w-52 shrink-0" style={{ color: "var(--foreground)" }}>{d.label}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${d.weight}%`, background: accentColor }}
                    />
                  </div>
                </div>
                <span className="font-mono text-[11px] w-8 text-right shrink-0" style={{ color: "var(--muted)" }}>
                  {d.weight}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
          Study Topics — {cert.topics.length} topics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cert.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} certId={cert.id} accuracy={null} />
          ))}
        </div>
      </div>

      <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <a
          href={cert.examGuideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] hover:underline"
          style={{ color: accentColor }}
        >
          Official Exam Guide ↗
        </a>
      </div>
    </div>
  )
}
