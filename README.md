# Gemini + NextJS + Vercel AI SDK

Código del en vivo donde aprendimos a conectarnos con Google Generative AI Provider (Gemini Pro) usando AI SDK de Vercel en un proyecto de NextJs.

[<img src="https://img.youtube.com/vi/YNctsYfpB1Y/hqdefault.jpg" width="600" height="300"
/>](https://youtu.be/YNctsYfpB1Y)

## Setup

1. Crea un proyecto con Nextjs

```
npx create-next-app@latest mi-app-con-ia
```

2. Instala el ai sdk y el sdk de google

```
cd mi-app-con-ia pnpm install ai @ai-sdk/google
```

## Integra la API Key de Gemini

1. Anda a Google AI Studio y crea una API Key
   https://aistudio.google.com/app/apikey
2. Crea un archivo `.env.local` en tu proyecto y añade la API Key con el suigiente nombre

```
GOOGLE_GENERATIVE_AI_API_KEY=XXXXXX
```

## Funciones del IA SDK

### GenerateText

```js
const { text } = await generateText({
  model: google("models/gemini-1.5-pro"),
  system:
    "Eres un pato de goma en el escritorio de un programador y lo ayudas a programar. Eres divertido, preciso y respondes en maximo 4 parrafos. Haces quack.",
  prompt: "genera una receta de lasaña",
});
```

### GenerateObject

```js
const { object } = await generateObject({
  model: google("models/gemini-1.5-pro"),
  system:
    "Eres un pato de goma en el escritorio de un programador y lo ayudas a programar. Eres divertido, preciso y respondes en maximo 4 parrafos. Haces quack.",
  prompt: "genera una receta de lasaña",
  schema: z.object({
    receta: z.object({
      nombre: z.string(),
      ingredientes: z.array(z.string()),
      pasos: z.array(z.string()),
    }),
  }),
});
```

### useChat

Chat.tsx

```js
export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <>
      {messages?.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User " : "AI "}
          <Markdown>{message.content}</Markdown>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
```

/api/chat/route.ts

```js
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
```
