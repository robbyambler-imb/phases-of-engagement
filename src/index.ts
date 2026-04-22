import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";
import { registerPrompts } from "./prompts/index.js";

function createMcpServer(): McpServer {
  const server = new McpServer({ name: "phases-of-engagement", version: "0.1.0" });
  registerResources(server);
  registerTools(server);
  registerPrompts(server);
  return server;
}

async function parseBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: unknown) => (body += String(chunk)));
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : undefined); }
      catch { resolve(undefined); }
    });
    req.on("error", reject);
  });
}

const PORT = process.env.PORT;

if (!PORT) {
  // ── Local mode (Claude Desktop) ───────────────────────────────────────────
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);

} else {
  // ── Remote mode (Railway) ─────────────────────────────────────────────────
  const transports = new Map<string, StreamableHTTPServerTransport>();

  const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, mcp-session-id");

    if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

    if (url.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", server: "phases-of-engagement", version: "0.1.0" }));
      return;
    }

    if (url.pathname !== "/mcp") { res.writeHead(404); res.end("Not found"); return; }

    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    try {
      if (sessionId && transports.has(sessionId)) {
        const transport = transports.get(sessionId)!;
        await transport.handleRequest(req, res, await parseBody(req));

      } else if (!sessionId && req.method === "POST") {
        let transport: StreamableHTTPServerTransport;
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (id: string) => { transports.set(id, transport); },
        });
        transport.onclose = () => { if (transport.sessionId) transports.delete(transport.sessionId); };

        const mcpServer = createMcpServer();
        await mcpServer.connect(transport);
        await transport.handleRequest(req, res, await parseBody(req));

      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Bad request" }));
      }
    } catch (err) {
      console.error("Request error:", err);
      if (!res.headersSent) { res.writeHead(500); res.end("Internal server error"); }
    }
  });

  httpServer.listen(parseInt(PORT), () => {
    console.log(`Phases of Engagement MCP server running on port ${PORT}`);
  });
}
