"use client"

import { useState, useCallback } from "react"
import type { Question } from "@/types"
import { shuffle, saveLocalAnswer } from "@/lib/questions"
import { saveAnswer } from "@/lib/actions"
import QuizQuestion from "./QuizQuestion"

interface SessionAnswer {
  questionId: string
  chosenKey: string
  correct: boolean
}

interface Props {
  questions: Question[]
  certId: string
  topicId: string
  topicLabel: string
  onExit: () => void
}

type Phase = "intro" | "quiz" | "summary"

export default function QuizSession({ questions, certId, topicId, topicLabel, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>("intro")
  const [shuffled, setShuffled] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<SessionAnswer[]>([])
  const [awaitingNext, setAwaitingNext] = useState(false)

  const startQuiz = () => {
    setShuffled(shuffle(questions))
    setCurrent(0)
    setAnswers([])
    setAwaitingNext(false)
    setPhase("quiz")
  }

  const handleAnswer = useCallback(
    (chosenKey: string, correct: boolean) => {
      const q = shuffled[current]
      setAnswers((prev) => [...prev, { questionId: q.id, chosenKey, correct }])
      saveLocalAnswer(certId, topicId, correct)
      saveAnswer(q.id, certId, topicId, chosenKey, correct).catch(() => {})
      setAwaitingNext(true)
    },
    [current, shuffled, certId, topicId]
  )

  const handleNext = () => {
    if (current + 1 >= shuffled.length) {
      setPhase("summary")
    } else {
      setCurrent((c) => c + 1)
      setAwaitingNext(false)
    }
  }

  const correctCount = answers.filter((a) => a.correct).length
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0

  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16">
        <div className="w-full max-w-md text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Study Session
          </p>
          <h1 className="text-2xl font-bold tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
            {topicLabel}
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
            {questions.length} question{questions.length !== 1 ? "s" : ""} · Shuffled each session · Explanation after each answer · Discuss with Claude
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={startQuiz}
              className="py-3 px-6 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start Session
            </button>
            <button
              onClick={onExit}
              className="py-3 px-6 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "summary") {
    const accColor = accuracy >= 80 ? "var(--accent)" : accuracy >= 60 ? "var(--gold)" : "#e53e3e"
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">
        <div className="w-full max-w-lg rounded-xl p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="font-mono text-[11px] uppercase tracking-widest mb-4 text-center" style={{ color: "var(--accent)" }}>
            Session Complete
          </p>
          <div className="text-center mb-6">
            <p className="text-5xl font-black tracking-tight mb-1" style={{ color: accColor, fontFamily: "var(--font-geist-sans)" }}>
              {accuracy}%
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {correctCount} of {answers.length} correct
            </p>
          </div>

          <div className="flex flex-col gap-1.5 mb-6 max-h-64 overflow-y-auto">
            {shuffled.map((q, i) => {
              const ans = answers[i]
              const ok = ans?.correct
              return (
                <div
                  key={q.id}
                  className="flex items-start gap-2.5 rounded-md px-3 py-2 text-sm"
                  style={{ background: ok ? "rgba(194,65,12,0.06)" : "rgba(229,62,62,0.06)" }}
                >
                  <span className="font-mono text-xs font-bold shrink-0 mt-0.5" style={{ color: ok ? "var(--accent)" : "#e53e3e" }}>
                    {ok ? "✓" : "✗"}
                  </span>
                  <span style={{ color: "var(--foreground)" }}>
                    {q.stem.slice(0, 90)}{q.stem.length > 90 ? "…" : ""}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={startQuiz}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Retry Session
            </button>
            <button
              onClick={onExit}
              className="w-full py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      <div className="w-full max-w-2xl mx-auto flex-1">
        <QuizQuestion
          question={shuffled[current]}
          questionNumber={current + 1}
          totalQuestions={shuffled.length}
          onAnswer={handleAnswer}
        />

        {awaitingNext && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleNext}
              className="py-2.5 px-5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              {current + 1 >= shuffled.length ? "See Results →" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
