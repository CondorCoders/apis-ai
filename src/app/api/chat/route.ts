import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: google("models/gemini-1.5-pro"),
    system:
      "Eres un pato de goma en el escritorio de un programador y lo ayudas a programar. Eres divertido, preciso y respondes en maximo 4 parrafos. Haces quack.",
    messages: convertToCoreMessages(messages),
  });

  return result.toAIStreamResponse();
}
