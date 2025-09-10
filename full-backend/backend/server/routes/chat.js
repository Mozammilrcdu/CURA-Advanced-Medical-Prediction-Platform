const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
  You are a health AI assistant. Answer ONLY in numbered points.
- Each point must be ONE short sentence maximum.
- Do NOT write greetings, introductions, conclusions, or stories.
- Do NOT use emojis, friendly chat phrases, or filler words like "wonderful" or "amazing".
- Do NOT write paragraphs or long explanations.
- Only give practical, actionable health advice.
- Always start points with numbers: 1, 2, 3, ...
Example response for "How to improve heart health?":
1. Eat fruits, vegetables, whole grains, and lean proteins.
2. Exercise at least 30 minutes most days.
3. Sleep 7-9 hours each night.
4. Manage stress with meditation, reading, or nature.
5. Avoid smoking and limit alcohol.
6. Monitor blood pressure, cholesterol, and blood sugar regularly.

NOTE: ANSWER IN POINTS NOT PARAGRAPH.
`
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    const stream = await model.generateContentStream(`User asks: "${message}"`);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullReply = "";

    for await (const chunk of stream.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        fullReply += chunkText;
        res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true, reply: fullReply })}\n\n`);
    res.end();

  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;
