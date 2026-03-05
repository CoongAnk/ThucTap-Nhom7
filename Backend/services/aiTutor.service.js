<<<<<<< HEAD
const OpenAI = require("openai");
const khanmigoPrompt = require("../prompts/khanmigoPrompt");
const AiMemory = require("../models/AiMemory");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateTutorReply = async ({ userId, message, context }) => {
  // 1️⃣ Load memory
  const memories = await AiMemory.find({ userId, lesson: context.lesson })
    .sort({ createdAt: -1 })
    .limit(3);

  const memoryText = memories.map(m => `- ${m.mistake}`).join("\n");

  // 2️⃣ Build system prompt
  const systemPrompt = `
=======
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
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
${khanmigoPrompt}

STUDENT CONTEXT:
Level: ${context.level}
<<<<<<< HEAD
Subject: ${context.subject}
Lesson: ${context.lesson}
Learning goal: ${context.goal}

PAST LEARNING ISSUES:
${memoryText || "No major issues recorded"}
`;

  // 3️⃣ Call OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });

  return completion.choices[0].message.content;
};
=======
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
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
