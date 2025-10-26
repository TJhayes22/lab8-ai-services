import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./env.js";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(GEMINI_API_KEY);

export async function getGeminiResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });
  console.log(response.text);
  } catch (err) {
    console.error("Gemini error: ", err);
    return "Sorry, Gemini couldn't respond right now.";
  }
  return response.text;
}

// getGeminiResponse();