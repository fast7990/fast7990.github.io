import "dotenv/config";
import { createServer } from "http";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { IterableReadableStream } from "@langchain/core/utils/stream";
function getTimestamp() {
    return new Date().toISOString();
}
function log(level, message, data) {
    const prefix = `[${getTimestamp()}] [${level}]`;
    if (data) {
        console.log(prefix, message, typeof data === "object" ? JSON.stringify(data, null, 2) : data);
    }
    else {
        console.log(prefix, message);
    }
}
function extractText(res) {
    if (typeof res === "string")
        return res;
    const content = res?.content;
    if (typeof content === "string")
        return content;
    if (Array.isArray(content)) {
        const texts = content
            .filter((b) => b?.type === "text" && typeof b?.text === "string")
            .map((b) => b.text);
        if (texts.length)
            return texts.join("\n\n");
    }
    if (content?.text && typeof content.text === "string") {
        return content.text;
    }
    try {
        return JSON.stringify(res, null, 2);
    }
    catch {
        return String(res);
    }
}
async function streamModel(provider, input) {
    log("INFO", "开始流式调用 AI 模型", { provider, inputLength: input.length });
    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            "You are a helpful assistant. Please respond in Markdown format. Use proper markdown syntax for formatting: code blocks with language tags, lists, tables, bold, italic, etc. Preserve the original markdown structure in your response.",
        ],
        ["human", "{input}"],
    ]);
    const messages = await prompt.formatMessages({ input });
    if (provider === "anthropic") {
        if (!process.env.ANTHROPIC_API_KEY) {
            log("WARN", "ANTHROPIC_API_KEY 未配置");
            throw new Error("Missing ANTHROPIC_API_KEY");
        }
        const model = new ChatAnthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
            anthropicApiUrl: "http://claudecode.geelib.360.cn:8083",
            model: "claude-sonnet-4-5-20250929",
            temperature: 0.2,
            topP: 1,
            maxTokens: 1024,
            // streaming: true,
        });
        log("DEBUG", "开始流式调用 Anthropic API...");
        const stream = await model.stream(messages);
        return stream;
    }
    if (provider === "openai") {
        if (!process.env.OPENAI_API_KEY) {
            log("WARN", "OPENAI_API_KEY 未配置");
            throw new Error("Missing OPENAI_API_KEY");
        }
        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0.2,
        });
        log("DEBUG", "开始流式调用 OpenAI API...");
        const stream = await model.stream(messages);
        return stream;
    }
    if (provider === "kimi") {
        if (!process.env.KIMI_API_KEY) {
            log("WARN", "KIMI_API_KEY 未配置");
            throw new Error("Missing KIMI_API_KEY");
        }
        const model = new ChatOpenAI({
            apiKey: process.env.KIMI_API_KEY,
            configuration: {
                baseURL: "https://api.moonshot.cn/v1",
            },
            model: "moonshot-v1-8k",
            temperature: 0.7,
            streaming: true,
        });
        log("DEBUG", "开始流式调用 Kimi API...");
        const stream = await model.stream(messages);
        return stream;
    }
    log("DEBUG", "使用 Echo 模式流式回显");
    const echoStream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            const text = `Echo: ${input}`;
            for (const char of text) {
                controller.enqueue(encoder.encode(char));
                await new Promise((r) => setTimeout(r, 10));
            }
            controller.close();
        },
    });
    return IterableReadableStream.fromReadableStream(echoStream);
}
function sendJson(res, status, data) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(data));
}
const server = createServer(async (req, res) => {
    log("INFO", "收到请求", {
        method: req.method,
        url: req.url,
        ip: req.socket.remoteAddress,
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        log("DEBUG", "处理 OPTIONS 预检请求");
        res.statusCode = 204;
        res.end();
        return;
    }
    if (req.method === "POST" && req.url === "/chat") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("error", () => res.destroy());
        req.on("end", async () => {
            log("DEBUG", "请求体接收完成", { bodyLength: body.length });
            try {
                const json = JSON.parse(body || "{}");
                const provider = json.provider || "echo";
                const input = json.input || "";
                log("INFO", "解析请求参数", { provider, inputLength: input.length });
                if (!input) {
                    log("WARN", "输入内容为空");
                    sendJson(res, 400, { error: "input is required" });
                    return;
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
                res.setHeader("Cache-Control", "no-cache");
                res.setHeader("Connection", "keep-alive");
                res.setHeader("Access-Control-Allow-Origin", "*");
                const encoder = new TextEncoder();
                const stream = await streamModel(provider, input);
                console.log("DEBUG", "流式调用模型响应", { stream });
                for await (const chunk of stream) {
                    const text = extractText(chunk);
                    log("DEBUG", "流式调用模型响应文本", { text });
                    res.write(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
                res.write(encoder.encode("data: [DONE]\n\n"));
                res.end();
                log("INFO", "流式响应完成");
            }
            catch (e) {
                log("ERROR", "流式响应失败", { error: e?.message ?? String(e) });
                const encoder = new TextEncoder();
                res.write(encoder.encode(`data: ${JSON.stringify({ error: e?.message ?? String(e) })}\n\n`));
                res.write(encoder.encode("data: [DONE]\n\n"));
                res.end();
            }
        });
        return;
    }
    log("WARN", "请求路由未找到", { method: req.method, url: req.url });
    sendJson(res, 404, { error: "not found" });
});
const port = Number(process.env.PORT || 8787);
server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
});
