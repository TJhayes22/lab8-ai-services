import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    // Get the API key from Netlify environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Parse incoming prompt
    const { prompt } = JSON.parse(req.body);
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Access the generated text safely
    const text = response?.content?.[0]?.text || "No response";

    return res.status(200).json({ text });

  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: err.message });
  }
}