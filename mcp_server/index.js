import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { allDefinitions } from "./tools/calendar.js";
const server = new McpServer({
    name: "secretaria",
    version: "1.0.0",
    capabilities: {
        tools: {}
    }
});
for (let definition of allDefinitions) {
    server.tool(definition.declaration.name, definition.declaration.description, definition.declaration.parameters ?? {}, definition.function);
}
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Server funcionando!");
//# sourceMappingURL=index.js.map