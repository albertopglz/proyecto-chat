import { useState } from "react";

export default function RoomSelector({ joinRoom }) {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Entrar al chat</h2>

      <input
        type="text"
        placeholder="Tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Sala"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />

      <button onClick={() => joinRoom(room, username)}>
        Entrar
      </button>
    </div>
  );
}
