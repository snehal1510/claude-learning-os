import Anthropic from "@anthropic-ai/sdk"

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("ANTHROPIC_API_KEY is not set. Add it to your .env.local file.", { status: 503 })
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const { stem, correctAnswer, chosenAnswer, isCorrect, explanation, userMessage, history } = await req.json()

  const systemPrompt = `You are an expert study assistant helping a student prepare for professional certification exams. You cover Salesforce certifications (Data Cloud Consultant, Agentforce Specialist, Agentforce FDA) and Anthropic/Claude certifications (Claude Associate, Claude Developer, Claude Architect).

Be concise, accurate, and pedagogical. Explain concepts clearly with concrete examples. When discussing Salesforce topics, reference official Salesforce documentation. When discussing Claude/Anthropic topics, reference official Anthropic documentation. Keep responses focused and under 300 words unless a longer explanation is genuinely needed.`

  const questionContext = `The student just answered this exam question:

Question: ${stem}

Correct answer: ${correctAnswer}
Student's answer: ${chosenAnswer} (${isCorrect ? "correct" : "incorrect"})

Official explanation: ${explanation}

The student wants to discuss this further.`

  type MessageParam = { role: "user" | "assistant"; content: string }

  const messages: MessageParam[] = [
    { role: "user" as const, content: questionContext },
    { role: "assistant" as const, content: "I can see this question. I'm ready to help you understand this concept better. What would you like to know?" },
    ...((history ?? []) as MessageParam[]),
    { role: "user" as const, content: userMessage },
  ]

  const stream = client.messages.stream({
    model: "claude-sonnet-5",
    max_tokens: 512,
    system: systemPrompt,
    messages,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  })
}
