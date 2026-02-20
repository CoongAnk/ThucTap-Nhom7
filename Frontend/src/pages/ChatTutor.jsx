import { useState } from "react";
import { chatWithTutor } from "../api/aiTutor.api";

export default function ChatTutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatWithTutor({
        userId: "1",
        message: input,
        lessonContext: {
          level: "beginner",
          subject: "Math",
          lesson: "Quadratic Equation",
          goal: "Understand quadratic equations"
        }
      });

      const aiMsg = { role: "ai", text: res.data.reply };
      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Tutor</h2>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
          </p>
        ))}
        {loading && <p>AI is thinking...</p>}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Hỏi bài ở đây..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
