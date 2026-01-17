import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/recommendation
router.post("/", async (req, res) => {
  const { budget, location, roomType, amenities } = req.body;

  try {
    const prompt = `
You are an AI hostel assistant. Recommend the best hostel rooms based on the following preferences:
- Budget: ${budget}
- Location: ${location}
- Room type: ${roomType}
- Amenities: ${amenities}

Provide 3 recommendations with brief reasons and room highlights.
`;

    // Create chat completion using latest SDK
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // change to gpt-4 if you have access
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const recommendation = response.choices[0].message.content;
    res.json({ recommendation });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

export default router;
