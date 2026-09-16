"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCertification, getTopic, loadTopicQuestions } from "@/lib/questions"
import type { Question, Certification, Topic } from "@/types"
import QuizSession from "@/components/QuizSession"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const certId = params.certId as string
  const topicId = params.topicId as string

  const [questions, setQuestions] = useState<Question[]>([])
  const [cert, setCert] = useState<Certification | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const c = getCertification(certId)
    const t = getTopic(certId, topicId)
    if (!c || !t) { router.replace("/"); return }
    setCert(c)
    setTopic(t)

    loadTopicQuestions(certId, topicId).then((qs) => {
      setQuestions(qs)
      setLoading(false)
    })
  }, [certId, topicId, router])

  if (loading || !cert || !topic) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
          />
          <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Loading questions…
          </p>
        </div>
      </div>
    )
  }

  return (
    <QuizSession
      questions={questions}
      certId={certId}
      topicId={topicId}
      topicLabel={topic.label}
      onExit={() => router.push(`/study/${certId}`)}
    />
  )
}
