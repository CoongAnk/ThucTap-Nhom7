import { generateTutorReply, generateChatReply } from "../services/aiTutor.service.js";

export const chatWithTutor = async (req, res) => {
  try {
    const { userId, message, lessonContext } = req.body;

    const reply = await generateTutorReply({
      userId,
      message,
      context: lessonContext
    });

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI Tutor failed" });
  }
};

export const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    const reply = await generateChatReply(message);

    res.json({ reply });

  } catch (error) {
    console.error("Chat AI Error:", error);
    res.status(500).json({ error: "AI chat error" });
  }
};