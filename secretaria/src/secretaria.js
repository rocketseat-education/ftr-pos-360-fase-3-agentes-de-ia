import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { allFunctions as calendarFunctions } from "./tools/calendar.js";
import { allFunctions as emailFunctions } from "./tools/email.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const allFunctions = calendarFunctions.concat(emailFunctions);

const contents = [
    {
        role: "user",
        parts: [{ text: "mande uma mensagem bonita de aniversário para a minha mãe. O contato chama 'mãe'" }]
    }
];

var response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        tools: [
            {
                functionDeclarations: allFunctions
            }
        ]
    }
});

console.log(response.candidates[0].content.parts[0]);

