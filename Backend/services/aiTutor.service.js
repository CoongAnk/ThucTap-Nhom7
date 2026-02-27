import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import khanmigoPrompt from "../prompts/khanmigoPrompt.js";
import AiMemory from "../models/AiMemory.js";

console.log("OPENROUTER KEY:", process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "AI Tutor Project"
  }
});

export const generateTutorReply = async ({ userId, message, context }) => {
  try {
    const memories = await AiMemory.find({
      userId,
      lesson: context.lesson
    })
      .sort({ createdAt: -1 })
      .limit(3);

    const memoryText = memories
      .map((m) => `- ${m.mistake}`)
      .join("\n");

    const systemPrompt = `
${khanmigoPrompt}

STUDENT CONTEXT:
Level: ${context.level}
Lesson: ${context.lesson}

PAST ISSUES:
${memoryText || "None"}
`;

    const completion = await openai.chat.completions.create({
      model: "stepfun/step-3.5-flash:free", // model free
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw error;
  }
};