import { generateTutorReply } from "../services/aiTutor.service.js";

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