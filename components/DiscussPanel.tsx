"use client"

import { useState, useRef, useEffect } from "react"
import type { Question } from "@/types"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface Props {
  question: Question
  chosenKey: string
  isCorrect: boolean
}

export default function DiscussPanel({ question, chosenKey, isCorrect }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const chosenOption = question.options.find((o) => o.key === chosenKey)
  const correctOption = question.options.find((o) => o.key === question.correct)

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch("/api/discuss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stem: question.stem,
          correctAnswer: correctOption?.text ?? question.correct,
          chosenAnswer: chosenOption?.text ?? chosenKey,
          isCorrect,
          explanation: question.explanation,
          userMessage: text,
          history: messages,
        }),
      })

      if (res.status === 503) {
        setMessages((prev) => [...prev, { role: "assistant", content: "The AI discussion feature requires an Anthropic API key. Add ANTHROPIC_API_KEY to your .env.local file (or Vercel environment variables) to enable it. All practice questions and study guides work without a key." }])
        setLoading(false)
        return
      }

      if (!res.ok || !res.body) {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }])
        setLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        assistantContent += chunk
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: "assistant", content: assistantContent }
          return next
        })
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Check your ANTHROPIC_API_KEY env var." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div
      className="mt-4 rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--surface-2)" }}
    >
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <span className="text-xs font-mono font-medium" style={{ color: "var(--accent)" }}>✦</span>
        <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Discuss with Claude</span>
        <span className="text-xs ml-1" style={{ color: "var(--muted)" }}>— ask anything about this concept</span>
      </div>

      {messages.length > 0 && (
        <div className="flex flex-col gap-3 px-4 py-3 max-h-72 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? { background: "var(--accent)", color: "#fff" }
                    : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }
                }
              >
                {msg.content || (loading && i === messages.length - 1 ? <span style={{ color: "var(--muted)" }}>Thinking…</span> : "")}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      <div className="px-3 py-3 flex gap-2" style={{ borderTop: messages.length > 0 ? "1px solid var(--border)" : undefined }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a follow-up question…"
          disabled={loading}
          className="flex-1 text-sm rounded-md px-3 py-2 outline-none"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="px-3.5 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
          style={{
            background: input.trim() && !loading ? "var(--accent)" : "var(--surface)",
            color: input.trim() && !loading ? "#fff" : "var(--muted)",
            border: "1px solid var(--border)",
          }}
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  )
}
