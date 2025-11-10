import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "secretaria",
    version: "1.0.0",
    capabilities: {
        tools: {}
    }
});

server.tool(
    "getTodayDate",
    "Retorna a data de hoje",
    {
        locale: z.string().describe("Lugar onde você quer saber a data")
    },
    async ({ locale }) => {
        const resultado = "01-05-2025";

        return {
            content: [{
                type: "text",
                text: resultado
            }]
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Server funcionando!");
    