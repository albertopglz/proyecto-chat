import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState(""); // FIX
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("mensaje");
  }, []);

  const joinRoom = () => {
    if (!room.trim() || !username.trim()) return;
    socket.emit("joinRoom", { room, username });
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("mensaje", {
      user: username,
      text: message,
      room,
    });

    setMessage("");
  };

  return (
    <div style={styles.page}>
      {!joined ? (
        <div style={styles.cardBig}>
          <h2 style={styles.title}>Entrar al chat</h2>

          <input
            style={styles.inputBig}
            placeholder="Tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.inputBig}
            placeholder="Sala (ej. general)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <button style={styles.buttonBig} onClick={joinRoom}>
            Entrar
          </button>
        </div>
      ) : (
        <div style={styles.chatCardBig}>
          <h2 style={styles.titleRoom}>Sala: {room}</h2>

          <div style={styles.chatBoxBig}>
            {messages.map((msg, i) => (
              <div key={i} style={styles.messageBig}>
                <div style={styles.messageHeader}>
                  <strong>{msg.user}</strong>
                  <span style={styles.time}>{msg.time}</span>
                </div>
                <p style={styles.text}>{msg.text}</p>
              </div>
            ))}
          </div>

          <div style={styles.row}>
            <input
              style={styles.inputMessage}
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.buttonSend} onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    background: "#181818",
    color: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  cardBig: {
    background: "#242424",
    padding: 40,
    borderRadius: 20,
    width: 420,
    textAlign: "center",
    boxShadow: "0 0 20px #000",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  inputBig: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    border: "none",
    background: "#333",
    color: "white",
    fontSize: 18,
  },

  buttonBig: {
    width: "100%",
    padding: 15,
    fontSize: 18,
    background: "#007bff",
    border: "none",
    borderRadius: 10,
    color: "white",
    cursor: "pointer",
  },

  chatCardBig: {
    background: "#242424",
    padding: 30,
    borderRadius: 20,
    width: 600,
    height: 650,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 20px #000",
  },

  titleRoom: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  chatBoxBig: {
    flex: 1,
    overflowY: "auto",
    background: "#111",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  messageBig: {
    background: "#333",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 18,
  },

  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  time: {
    fontSize: 14,
    color: "#ccc",
  },

  text: {
    fontSize: 17,
  },

  row: {
    display: "flex",
    gap: 10,
  },

  inputMessage: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "#333",
    color: "white",
    fontSize: 18,
  },

  buttonSend: {
    padding: "15px 25px",
    fontSize: 18,
    background: "#1e90ff",
    border: "none",
    borderRadius: 12,
    color: "white",
    cursor: "pointer",
  },
};

export default App;
