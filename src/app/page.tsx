import { generateObject, generateText } from "ai";
import styles from "./page.module.css";
import { google } from "@ai-sdk/google";
import z from "zod";
import { Chat } from "@/components/Chat";
import Markdown from "react-markdown";

export default async function Home() {
  // GenerateText
  const { text } = await generateText({
    model: google("models/gemini-1.5-pro"),
    system: "Eres un chef",
    prompt: "genera una receta de lasaña",
  });

  // GenerateObject
  const { object } = await generateObject({
    model: google("models/gemini-1.5-pro"),
    system: "Eres un chef",
    prompt: "genera una receta de lasaña",
    schema: z.object({
      receta: z.object({
        nombre: z.string(),
        ingredientes: z.array(z.string()),
        pasos: z.array(z.string()),
      }),
    }),
  });

  return (
    <main className={styles.main}>
      <h1>Gemini + AI SDK + NextJS</h1>
      ---------------------------
      <h2>ChatBot con useChat</h2>
      ---------------------------
      <Chat />
      ---------------------------
      <h2>Generate Text</h2>
      ---------------------------
      <Markdown>{text}</Markdown>
      ---------------------------
      <h2>Generate Object</h2>
      ---------------------------
      <code style={{ display: "block" }}>{JSON.stringify(object?.receta)}</code>
    </main>
  );
}
