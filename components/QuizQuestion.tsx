"use client"

import { useState } from "react"
import type { Question } from "@/types"
import DiscussPanel from "./DiscussPanel"

interface Props {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (chosenKey: string, correct: boolean) => void
}

export default function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showDiscuss, setShowDiscuss] = useState(false)

  const handleSubmit = () => {
    if (!selected || submitted) return
    setSubmitted(true)
    onAnswer(selected, selected === question.correct)
  }

  const isCorrect = submitted && selected === question.correct

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[11px] font-medium tracking-wider uppercase" style={{ color: "var(--muted)" }}>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>
          {"●".repeat(question.difficulty)}{"○".repeat(5 - question.difficulty)}
        </span>
      </div>

      <div className="h-0.5 rounded-full mb-6" style={{ background: "var(--border)" }}>
        <div
          className="h-0.5 rounded-full transition-all"
          style={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%`, background: "var(--accent)" }}
        />
      </div>

      <p className="text-base leading-relaxed font-medium mb-6" style={{ color: "var(--foreground)" }}>
        {question.stem}
      </p>

      <div className="flex flex-col gap-2.5 mb-5">
        {question.options.map((opt) => {
          const isSelected = selected === opt.key
          const isCorrectOpt = submitted && opt.key === question.correct
          const isWrongOpt = submitted && isSelected && !isCorrectOpt

          let borderColor = "var(--border)"
          let bg = "var(--surface)"
          let textColor = "var(--foreground)"

          if (isCorrectOpt) { borderColor = "var(--accent)"; bg = "rgba(194,65,12,0.08)" }
          if (isWrongOpt) { borderColor = "#e53e3e"; bg = "rgba(229,62,62,0.07)" }
          if (isSelected && !submitted) { borderColor = "var(--accent)"; bg = "rgba(194,65,12,0.06)" }

          return (
            <button
              key={opt.key}
              onClick={() => !submitted && setSelected(opt.key)}
              disabled={submitted}
              className="w-full text-left rounded-lg p-4 flex items-start gap-3 transition-all"
              style={{ border: `1px solid ${borderColor}`, background: bg, cursor: submitted ? "default" : "pointer" }}
            >
              <span
                className="font-mono text-xs font-bold shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded"
                style={{
                  background: isSelected || isCorrectOpt ? (isWrongOpt ? "#e53e3e" : "var(--accent)") : "var(--surface-2)",
                  color: isSelected || isCorrectOpt ? "#fff" : "var(--muted)",
                  border: `1px solid ${isSelected || isCorrectOpt ? "transparent" : "var(--border)"}`,
                }}
              >
                {opt.key}
              </span>
              <span className="text-sm leading-relaxed flex-1" style={{ color: textColor }}>
                {opt.text}
              </span>
              {isCorrectOpt && <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>✓</span>}
              {isWrongOpt && <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#e53e3e" }}>✗</span>}
            </button>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-3 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: selected ? "var(--accent)" : "var(--surface-2)",
            color: selected ? "#fff" : "var(--muted)",
            border: "1px solid transparent",
            cursor: selected ? "pointer" : "default",
          }}
        >
          Submit Answer
        </button>
      )}

      {submitted && (
        <div
          className="rounded-lg p-5 mt-2"
          style={{
            background: isCorrect ? "rgba(194,65,12,0.07)" : "rgba(229,62,62,0.06)",
            border: `1px solid ${isCorrect ? "rgba(194,65,12,0.25)" : "rgba(229,62,62,0.25)"}`,
          }}
        >
          <p
            className="font-bold text-sm mb-3"
            style={{ color: isCorrect ? "var(--accent)" : "#e53e3e" }}
          >
            {isCorrect ? "Correct!" : `Incorrect — correct answer is ${question.correct}`}
          </p>

          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--foreground)" }}>
            {question.explanation}
          </p>

          {!isCorrect && selected && question.distractors[selected] && (
            <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(229,62,62,0.2)" }}>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#e53e3e" }}>
                Why {selected} is wrong
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {question.distractors[selected]}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <a
              href={question.citation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Anthropic Documentation ↗
            </a>
            <span className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>
              Verified: {question.verified_against_release}
            </span>
          </div>

          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => setShowDiscuss((v) => !v)}
              className="font-mono text-[11px] font-medium hover:opacity-80 transition-opacity flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              <span>✦</span>
              <span>{showDiscuss ? "Hide discussion" : "Discuss with Claude →"}</span>
            </button>
          </div>
        </div>
      )}

      {submitted && showDiscuss && selected && (
        <DiscussPanel question={question} chosenKey={selected} isCorrect={isCorrect} />
      )}
    </div>
  )
}
