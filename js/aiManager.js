import { getBotResponse } from './eliza.js';

let currentModel = 'eliza';

export function setModel(modelName) {
    currentModel = modelName;
}

export async function getAIResponse(prompt) {
    switch (currentModel) {
        case 'gemini':
            return await getGeminiResponse(prompt);
        case 'eliza':
        default:
            return getBotResponse(prompt);
    }
}