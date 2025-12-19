import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/ask-teacher", async (req, res) => {
  const { question, chapterContent, videoContext, chatHistory } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  const historyMessages = (chatHistory || []).map((msg) => ({
    role: msg.sender === "student" ? "user" : "assistant",
    content: msg.text,
  }));

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an economics teacher. Answer ONLY from the given material.",
          },
          ...historyMessages,
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "AI service failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
