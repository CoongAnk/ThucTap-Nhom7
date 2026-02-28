import { useState, useRef, useEffect } from "react";
import { GraduationCap } from "lucide-react";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "chat-user",
          message: input,
          lessonContext: {
            level: "beginner",
            subject: "General",
            lesson: "Chatbot",
            goal: "Answer student questions"
          }
        })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Có lỗi xảy ra." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #1e40af)",
            color: "white",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}
        >
        <GraduationCap size={26} />
        </button>

      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: 95,
          right: 20,
          width: 360,
          height: 500,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 1000
        }}>

          {/* Header */}
          <div style={{
            padding: 16,
            background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
            color: "white",
            fontWeight: "600",
            fontSize: 16
          }}>
            AI Tutor
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: 16,
            overflowY: "auto",
            background: "#f9fafb"
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 12
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius: 16,
                    fontSize: 14,
                    lineHeight: 1.5,
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                        : "#e5e7eb",
                    color: msg.role === "user" ? "white" : "#111827"
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                AI đang trả lời...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{
            display: "flex",
            padding: 12,
            borderTop: "1px solid #e5e7eb",
            background: "white"
          }}>
            <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
                }
            }}
            placeholder="Nhập câu hỏi..."
            rows={1}
            style={{
                flex: 1,
                resize: "none",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: 14,
                outline: "none"
            }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: 8,
                background: "#2563eb",
                border: "none",
                color: "white",
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}