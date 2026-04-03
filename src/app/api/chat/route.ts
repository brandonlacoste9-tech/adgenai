import Anthropic from "@anthropic-ai/sdk";
import { storage } from "@/lib/storage";
import { SYSTEM_PROMPT, MODEL_MAP } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { sessionId, message, model = "claude-sonnet", temperature = 0.7 } = await req.json();

  if (!sessionId || !message) {
    return new Response(JSON.stringify({ error: "sessionId and message required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Save user message
  storage.createMessage({
    id: crypto.randomUUID(),
    sessionId,
    role: "user",
    content: message,
  });

  // Get conversation history
  const history = storage.getMessages(sessionId);
  const apiMessages = history.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const resolvedModel = MODEL_MAP[model] || "claude_sonnet_4_6";

  const client = new Anthropic();

  // Stream with SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";

      try {
        const anthropicStream = await client.messages.stream({
          model: resolvedModel,
          max_tokens: 4096,
          temperature: Math.min(temperature, 1.0),
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        });

        for await (const event of anthropicStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            const text = event.delta.text;
            fullResponse += text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "delta", text })}\n\n`));
          }
        }

        // Save assistant message
        storage.createMessage({
          id: crypto.randomUUID(),
          sessionId,
          role: "assistant",
          content: fullResponse,
        });

        // Auto-update title
        const session = storage.getSession(sessionId);
        if (session && session.title === "New chat") {
          const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");
          storage.updateSession(sessionId, { title });
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "title", title })}\n\n`));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Generation failed";
        console.error("Chat error:", err);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: errorMessage })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
