"use client"

interface Props {
  content: string
  topicLabel: string
}

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n")
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("# ")) {
      nodes.push(
        <h1 key={i} className="text-2xl font-black tracking-tight mb-4" style={{ color: "var(--foreground)" }}>
          {line.slice(2)}
        </h1>
      )
    } else if (line.startsWith("## ")) {
      nodes.push(
        <h2 key={i} className="text-lg font-bold tracking-tight mt-8 mb-3" style={{ color: "var(--foreground)" }}>
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={i} className="text-base font-semibold mt-5 mb-2" style={{ color: "var(--foreground)" }}>
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <ul key={`ul-${i}`} className="flex flex-col gap-1.5 mb-4 ml-4">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed flex items-start gap-2" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--accent)" }}>·</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.startsWith("```")) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      nodes.push(
        <pre key={`code-${i}`} className="rounded-lg p-4 mb-4 overflow-x-auto text-xs leading-relaxed" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--foreground)", fontFamily: "var(--font-mono)" }}>
          {codeLines.join("\n")}
        </pre>
      )
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      nodes.push(
        <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: "var(--foreground)" }}
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      )
    }
    i++
  }

  return nodes
}

function formatInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code style="background:var(--surface-2);border:1px solid var(--border);padding:1px 5px;border-radius:4px;font-size:0.8em;font-family:var(--font-mono)">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

export default function StudyGuide({ content }: Props) {
  return (
    <article className="max-w-2xl">
      {renderMarkdown(content)}
    </article>
  )
}
