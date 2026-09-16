"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CERTIFICATIONS, getLocalStats } from "@/lib/questions"
import type { LocalTopicStats } from "@/lib/questions"

export default function ProgressPage() {
  const [stats, setStats] = useState<LocalTopicStats[]>([])

  useEffect(() => {
    setStats(getLocalStats())
  }, [])

  type TopicStat = { attempts: number; correct: number }
  const statsMap: Record<string, Record<string, TopicStat>> = {}

  for (const row of stats) {
    if (!statsMap[row.certId]) statsMap[row.certId] = {}
    statsMap[row.certId][row.topicId] = { attempts: row.attempts, correct: row.correct }
  }

  const totalAttempted = stats.reduce((s, r) => s + r.attempts, 0)
  const totalCorrect = stats.reduce((s, r) => s + r.correct, 0)
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 w-full">
      <div className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
          Your Progress
        </p>
        <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
          Study Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Questions Attempted", value: totalAttempted || "—" },
          { label: "Correct Answers", value: totalAttempted ? totalCorrect : "—" },
          { label: "Overall Accuracy", value: overallAccuracy != null ? `${overallAccuracy}%` : "—" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-5"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
              {s.label}
            </p>
            <p className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
          By Certification
        </p>
        <div className="flex flex-col gap-4">
          {CERTIFICATIONS.map((cert) => {
            const certStats = statsMap[cert.id] ?? {}
            const certAttempts = Object.values(certStats).reduce((s, v) => s + v.attempts, 0)
            const certCorrect = Object.values(certStats).reduce((s, v) => s + v.correct, 0)
            const certAcc = certAttempts > 0 ? Math.round((certCorrect / certAttempts) * 100) : null
            const isGold = cert.color === "gold"
            const accentColor = isGold ? "var(--gold)" : "var(--accent)"

            return (
              <div
                key={cert.id}
                className="rounded-lg overflow-hidden"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div
                  className="px-5 py-4 flex items-center justify-between"
                  style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-0.5" style={{ color: accentColor }}>
                      {cert.mode}
                    </p>
                    <h2 className="font-bold text-sm tracking-tight" style={{ color: "var(--foreground)" }}>
                      {cert.label}
                    </h2>
                  </div>
                  <div className="text-right">
                    {certAcc != null ? (
                      <>
                        <p
                          className="text-xl font-black tracking-tight"
                          style={{ color: certAcc >= 80 ? "var(--accent)" : certAcc >= 60 ? "var(--gold)" : "#e53e3e" }}
                        >
                          {certAcc}%
                        </p>
                        <p className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>
                          {certAttempts} attempted
                        </p>
                      </>
                    ) : (
                      <p className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>Not started</p>
                    )}
                  </div>
                </div>

                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {cert.topics.map((topic) => {
                    const ts = certStats[topic.id]
                    const topicAcc = ts ? Math.round((ts.correct / ts.attempts) * 100) : null
                    const accColor =
                      topicAcc == null ? "var(--muted)"
                      : topicAcc >= 80 ? "var(--accent)"
                      : topicAcc >= 60 ? "var(--gold)"
                      : "#e53e3e"

                    return (
                      <Link
                        key={topic.id}
                        href={`/study/${cert.id}/${topic.id}`}
                        className="flex items-center justify-between px-5 py-3 hover:opacity-80 transition-opacity"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm" style={{ color: "var(--foreground)" }}>{topic.label}</span>
                          {topicAcc == null && (
                            <span
                              className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider"
                              style={{ background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
                            >
                              Start
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          {ts && (
                            <span className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                              {ts.attempts} attempts
                            </span>
                          )}
                          <span className="font-mono text-[11px] font-medium w-12 text-right" style={{ color: accColor }}>
                            {topicAcc != null ? `${topicAcc}%` : "—"}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {totalAttempted === 0 && (
        <div className="text-center py-16">
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            No study history yet. Start a session to track your progress.
          </p>
          <Link
            href="/"
            className="font-mono text-[11px] px-4 py-2 rounded-md"
            style={{ background: "var(--accent)", color: "#fff", textDecoration: "none" }}
          >
            Pick a certification →
          </Link>
        </div>
      )}
    </div>
  )
}
