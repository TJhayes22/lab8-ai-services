// @netlify-function-bundler: esbuild
import { GoogleGenAI } from "@google/genai";

export async function handler(event) {
  // Minimal: assume POST and JSON
  const { prompt } = JSON.parse(event.body);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });

  const text = response.text;
  console.log(response.text);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ text }),
  };
}
