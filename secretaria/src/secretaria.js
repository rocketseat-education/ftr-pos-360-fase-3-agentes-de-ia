import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { allDefinitions as calendarDefinitions } from "./tools/calendar.js";
import { allDefinitions as emailDefinitions } from "./tools/email.js";
import readline from "readline";

dotenv.config();

const allDefinitions = calendarDefinitions.concat(emailDefinitions);
const allDeclarations = allDefinitions.map(def => def.declaration);
const allFunctions = Object.fromEntries(allDefinitions.map(def => [def.declaration.name, def.function]));

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const contents = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

while (true) {
    const query = await new Promise(resolve => {
        rl.question("Você: ", resolve);
    });

    contents.push({
        role: "user",
        parts: [{ text: query }]
    });

    var response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: contents,
        config: {
            tools: [
                {
                    functionDeclarations: allDeclarations
                }
            ]
        }
    });

    while (response.functionCalls) {
        

        for (const func of response.functionCalls) {
            const functionToExecute = func.name;
            const functionParameters = func.args;

            console.log(`**Chamando função ${functionToExecute}`);

            const fn = allFunctions[functionToExecute];

            const result = fn(functionParameters);

            const functionResponse = {
                role: "user",
                parts: [{
                    functionResponse: {
                        name: functionToExecute,
                        response: { result: result }
                    }
                }]
            }

            contents.push(functionResponse);
        }


        response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: contents,
            config: {
                tools: [
                    {
                        functionDeclarations: allDeclarations
                    }
                ]
            }
        });
    }


    console.log("IA: ", response.candidates[0].content.parts[0].text);
}
