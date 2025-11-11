import { GoogleGenAI, mcpToTool } from "@google/genai";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client";
import dotenv from "dotenv";
import readline from "readline";
import { server } from "typescript";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const serverParams = new StdioClientTransport({
    command: "node",
    args: ["index.js"]
});

const client = new Client({
    name: "secretaria-client",
    version: "1.0.0"
});

await client.connect(serverParams);

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
            tools: [mcpToTool(client)]
        }
    });


    console.log("IA: ", response.candidates[0].content.parts[0].text);
}
