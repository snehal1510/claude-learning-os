import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { stem, correctAnswer, chosenAnswer, isCorrect, explanation, userMessage, history } = await req.json()

  const systemPrompt = `You are a helpful study assistant for Anthropic certification exams. You help students understand concepts related to Claude and the Anthropic API. Be concise, accurate, and pedagogical. When explaining concepts, use concrete examples from the Anthropic SDK. Keep responses focused and under 300 words unless a longer explanation is genuinely needed.`

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
