import Groq from "groq-sdk";
import { NextRequest } from "next/server";

// Get API key from environment variable
const groqAPIKey = process.env.GROQ_API_KEY;

if (!groqAPIKey) {
  console.error("GROQ_API_KEY environment variable is not set");
}

const groq = new Groq({
  apiKey: groqAPIKey,
});

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!groqAPIKey) {
      return new Response(
        JSON.stringify({ 
          error: "GROQ_API_KEY is not configured. Please set it in your environment variables." 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages, model = "openai/gpt-oss-20b", temperature = 0.5 } =
      await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...messages,
      ],
      model,
      temperature,
      max_completion_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Groq API error:", error);
    
    // Provide more helpful error messages
    let errorMessage = "Failed to stream response";
    let statusCode = 500;

    if (error.status === 401) {
      errorMessage = "Invalid API key. Please check your GROQ_API_KEY environment variable.";
      statusCode = 401;
    } else if (error.message) {
      errorMessage = error.message;
      if (error.status) {
        statusCode = error.status;
      }
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: statusCode, headers: { "Content-Type": "application/json" } }
    );
  }
}

