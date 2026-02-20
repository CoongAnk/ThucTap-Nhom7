const { generateTutorReply } = require("../services/aiTutor.service");

exports.chatWithTutor = async (req, res) => {
  try {
    const { userId, message, lessonContext } = req.body;

    const reply = await generateTutorReply({
      userId,
      message,
      context: lessonContext
    });

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Tutor failed" });
  }
};
