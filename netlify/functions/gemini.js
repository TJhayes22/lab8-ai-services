import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    // Get API key from Netlify environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY in environment variables.");
    }

    const genAI = new GoogleGenAI(apiKey);

    // Parse incoming prompt
    const { prompt } = JSON.parse(req.body);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return res.status(200).json({ text });

  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: err.message });
  }
}