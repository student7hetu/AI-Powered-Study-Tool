import { useState } from "react";
import { askTeacher } from "../../services/aiService";
import chapterContent from "../../data/chapterContent";
import videoSummaries from "../../data/videoSummaries";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const videoContext = videoSummaries
    .map((video) => `${video.title}: ${video.summary}`)
    .join("\n");

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const studentMessage = {
      sender: "student",
      text: input,
    };

    setMessages((prev) => [...prev, studentMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const teacherReply = await askTeacher(input);

      const teacherMessage = {
        sender: "teacher",
        text: teacherReply,
      };

      setMessages((prev) => [...prev, teacherMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "teacher",
          text: "Sorry, I couldn’t answer that right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px" }}>
      <h4>Student–Teacher Dialogue</h4>

      <div style={{ minHeight: "200px", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>
              {msg.sender === "student" ? "Student" : "Teacher"}:
            </strong>{" "}
            {msg.text}
          </p>
        ))}

        {isLoading && (
          <p>
            <strong>Teacher:</strong> Thinking...
          </p>
        )}
      </div>

      <input
        type="text"
        placeholder="Ask your doubt..."
        value={input}
        disabled={isLoading}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%" }}
      />

      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default ChatBox;
