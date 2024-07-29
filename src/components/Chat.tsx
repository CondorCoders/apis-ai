"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";

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
          placeholder="Haz una pregunta"
          name="prompt"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
