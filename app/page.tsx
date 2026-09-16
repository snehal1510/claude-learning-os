import { CERTIFICATIONS } from "@/lib/questions"
import CertCard from "@/components/CertCard"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full">
      <div className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          Claude Learning OS
        </p>
        <h1 className="text-3xl font-black tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
          Certification Tracks
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--muted)", maxWidth: "55ch" }}>
          Study for your Anthropic certifications with targeted practice questions, full explanations, AI-powered discussion, and progress tracking.
          Pick a track to start.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.id} className="relative">
            <CertCard cert={cert} accuracy={null} />
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Certifications</p>
            <p className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>{CERTIFICATIONS.length}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Topics</p>
            <p className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
              {CERTIFICATIONS.reduce((s, c) => s + c.topics.length, 0)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Questions</p>
            <p className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
              {CERTIFICATIONS.reduce((s, c) => s + c.topics.reduce((ts, t) => ts + t.questionCount, 0), 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
