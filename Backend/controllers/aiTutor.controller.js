<<<<<<< HEAD
const { generateTutorReply } = require("../services/aiTutor.service");

exports.chatWithTutor = async (req, res) => {
=======
import { generateTutorReply } from "../services/aiTutor.service.js";

export const chatWithTutor = async (req, res) => {
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
  try {
    const { userId, message, lessonContext } = req.body;

    const reply = await generateTutorReply({
      userId,
      message,
      context: lessonContext
    });

    res.json({ reply });
<<<<<<< HEAD
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Tutor failed" });
  }
};
=======
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI Tutor failed" });
  }
};
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
