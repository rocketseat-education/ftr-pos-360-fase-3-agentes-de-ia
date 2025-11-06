import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: "user",
            parts: [{ text: "que dia é hoje?" }]
        }
    ]
});

console.log(response.candidates[0].content.parts);