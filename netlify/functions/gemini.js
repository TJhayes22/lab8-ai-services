import { GoogleGenAI } from "@google/genai";

export async function handler(event, context) {
  try {
    // Get the API key from Netlify environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Parse incoming prompt
    const { prompt } = JSON.parse(event.body);
    if (!prompt || typeof prompt !== "string") {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid prompt"}),
        }
    };

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Access the generated text safely
    const text = response?.content?.[0]?.text || "No response";

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };

  } catch (err) {
    console.error("Gemini error:", err);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message }),
    };
  }
}