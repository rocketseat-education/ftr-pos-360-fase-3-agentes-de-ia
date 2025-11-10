import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
    name: "secretaria",
    version: "1.0.0",
    capabilities: {
        tools: {}
    }
});

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("MCP Server funcionando!");
    