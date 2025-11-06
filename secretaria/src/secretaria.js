import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const contents = [
    {
        role: "user",
        parts: [{ text: "qual a temperatura no Brasil?" }]
    }
];

var response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        tools: [
            {
                functionDeclarations: [
                    { 
                        name: "getTodayDate", 
                        description: "retorna a data de hoje no formato yyyy-mm-dd" 
                    },
                    {
                        name: "getCountryTemperature",
                        description: "retorna a temperatura do país indicado",
                        parameters: {
                            type: "OBJECT",
                            properties: {
                                country: {
                                    type: "STRING",
                                    description: "País para o qual se quer saber a temperatura"
                                },
                                isCelsius: {
                                    type: "BOOLEAN",
                                    description: "Se devemos retornar a temperatura em Celsius ou não (padrão é true)"
                                }
                            },
                            required: ["country", "isCelsius"]
                        }
                    }
                ]
            }
        ]
    }
});

console.log(response.candidates[0].content.parts[0].functionCall);

// contents.push({
//     role: "model",
//     parts: response.candidates[0].content.parts
// });
// 
// contents.push({
//     role: "user",
//     parts: [{
//         functionResponse: {
//             name: "getTodayDate",
//             response: { result: "2025-04-01" }
//         }
//     }]
// });
// 
// response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: contents,
// });
// 
// console.log(response.candidates[0].content);
