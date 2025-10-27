import { getBotResponse } from './eliza.js';


let currentModel = 'gemini';

/**
 * Sets the current AI model to use.
 * @param {string} modelName - The name of the model (e.g., "gemini" or "eliza").
 */
export function setModel(modelName) {
  currentModel = modelName;
}

/**
 * Gets a response from the currently selected AI model.
 * @param {string} user_prompt - The user input to send to the AI model.
 * @returns {string} - The model's response text.
 */
export async function getAIResponse(user_prompt) {
  switch (currentModel) {
    case 'gemini':
      return await getGeminiResponse(user_prompt);

    case 'eliza':
    default:
      return getBotResponse(user_prompt);
  }
}

async function getGeminiResponse(user_prompt) {
  try {
    const response = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: user_prompt }),
    });
    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error('Gemini error:', err);
    return 'Sorry, Gemini is unavailable right now.';
  }
}