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
${khanmigoPrompt}

STUDENT CONTEXT:
Level: ${context.level}
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
