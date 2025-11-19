import { useState } from "react";
import Message from "./Message";

export default function ChatWindow({ messages, sendMessage }) {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>

      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, idx) => (
          <Message key={idx} {...msg} />
        ))}
      </div>

      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage(text)}
      />

      <button
        onClick={() => {
          sendMessage(text);
          setText("");
        }}
      >
        Enviar
      </button>
    </div>
  );
}
