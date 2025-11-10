import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { allDefinitions as calendarDefinitions } from "./tools/calendar.js";
import { allDefinitions as emailDefinitions } from "./tools/email.js";
dotenv.config();

const allDefinitions = calendarDefinitions.concat(emailDefinitions);
const allDeclarations = allDefinitions.map(def => def.declaration);
const allFunctions = Object.fromEntries(allDefinitions.map(def => [def.declaration.name, def.function]));

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const contents = [
    {
        role: "user",
        parts: [{ text: "Que dia é hoje?" }]
    }
];

var response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        tools: [
            {
                functionDeclarations: allDeclarations
            }
        ]
    }
});

const functionCall = response.candidates[0].content.parts[0].functionCall;

const functionToExecute = functionCall.name;
const functionParameters = functionCall.args;

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

//console.log(result);

contents.push(functionResponse);

response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        tools: [
            {
                functionDeclarations: allDeclarations
            }
        ]
    }
});

console.log(response.candidates[0].content.parts[0]);