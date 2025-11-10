import { PROMPT_ANALYZE_INPUT, PROMPT_DOAJ } from '../config/prompt.js';
import { createChatCompletion } from "../config/client.js";

export const analyzeInputWithAI = async (userInput) => {
    try {

        const prompt = PROMPT_ANALYZE_INPUT.replace("{user_input}", userInput);
        const response = await createChatCompletion([{ role: "user", content: prompt }]);
        const content = response.choices[0].message.content.trim();

        const arrayMatch = content.match(/\[.*\]/s);
        if (arrayMatch) {
            return JSON.parse(arrayMatch);
        }

        return null;

    } catch (error) {
        console.error('Error analyzing input with AI', error);
        return null;
    }
}

export const generateAI = async (userInput) => {
    try {

        const prompt = PROMPT_DOAJ.replace("{input_prompt}", userInput);
        const response = await createChatCompletion([{ role: "user", content: prompt }]);
        const content = response.choices[0].message.content.trim();
        return content;

    } catch (error) {
        console.error('Error analyzing AI', error);
        return null;
    }
}