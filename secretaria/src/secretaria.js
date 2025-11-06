import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const contents = [
    {
        role: "user",
        parts: [{ text: "que dia é hoje?" }]
    }
];

var response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        tools: [
            {
                functionDeclarations: [
                    { name: "getTodayDate", description: "retorna a data de hoje no formato yyyy-mm-dd" }
                ]
            }
        ]
    }
});

console.log(response.candidates[0].content.parts[0].functionCall);

contents.push({
    role: "user",
    parts: [{
        functionResponse: {
            name: "getTodayDate",
            response: { result: "2025-04-01" }
        }
    }]
});

response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
});

console.log(response.candidates[0].content);
