import os
import logging
import json
from enum import Enum
from typing import Optional, AsyncGenerator

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%dT%H:%M:%S.%fZ'
)

logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PORT = int(os.getenv("PORT", "8787"))

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_API_BASE_URL = os.getenv("ANTHROPIC_API_BASE_URL", "http://claudecode.geelib.360.cn:8083")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")


class Provider(str, Enum):
    anthropic = "anthropic"
    openai = "openai"
    echo = "echo"


class ChatRequest(BaseModel):
    provider: Provider = Provider.echo
    input: str


async def stream_model(provider: Provider, user_input: str) -> AsyncGenerator[str, None]:
    if provider == Provider.echo:
        logger.info("使用 Echo 测试模式")
        for char in user_input:
            data = {"text": char}
            yield f"data: {json.dumps(data, ensure_ascii=False)}\n\n"
        yield "data: [DONE]\n\n"
        return

    if provider == Provider.anthropic:
        if not ANTHROPIC_API_KEY:
            logger.error("未配置 ANTHROPIC_API_KEY")
            yield "data: {\"text\":\"错误：未配置 ANTHROPIC_API_KEY\"}\n\n"
            yield "data: [DONE]\n\n"
            return

        logger.debug(f"开始调用 Anthropic API，输入长度: {len(user_input)}")
        try:
            llm = ChatAnthropic(
                api_key=ANTHROPIC_API_KEY,
                base_url=ANTHROPIC_API_BASE_URL,
                model="claude-3-5-sonnet-20241022",
                streaming=False,
                temperature=0.7
            )
            
            messages = [HumanMessage(content=user_input)]
            
            response = llm.invoke(messages)
            
            if hasattr(response, 'content'):
                if isinstance(response.content, str):
                    full_text = response.content
                else:
                    full_text = ""
                    for content in response.content:
                        if hasattr(content, 'text'):
                            full_text += content.text
                
                logger.info(f"Anthropic 响应完成，总长度: {len(full_text)}")
                
                for char in full_text:
                    data = {"text": char}
                    yield f"data: {json.dumps(data, ensure_ascii=False)}\n\n"
            else:
                logger.warning("Anthropic 响应没有 content 属性")
                yield "data: {\"text\":\"错误：响应格式异常\"}\n\n"
            
            yield "data: [DONE]\n\n"
            logger.info("Anthropic 流式响应完成")
        except Exception as e:
            logger.error(f"Anthropic API 调用失败: {str(e)}")
            yield f"data: {{\"text\":\"错误：{str(e)}\"}}\n\n"
            yield "data: [DONE]\n\n"
        return

    if provider == Provider.openai:
        if not OPENAI_API_KEY:
            logger.error("未配置 OPENAI_API_KEY")
            yield "data: {\"text\":\"错误：未配置 OPENAI_API_KEY\"}\n\n"
            yield "data: [DONE]\n\n"
            return

        logger.debug(f"开始流式调用 OpenAI API，输入长度: {len(user_input)}")
        try:
            llm = ChatOpenAI(
                api_key=OPENAI_API_KEY,
                model="gpt-4",
                streaming=True,
                temperature=0.7
            )
            
            messages = [HumanMessage(content=user_input)]
            
            for chunk in llm.stream(messages):
                if hasattr(chunk, 'content') and chunk.content:
                    text = chunk.content
                    logger.debug(f"发送数据块 {{\"textLength\":{len(text)},\"textPreview\":\"{text[:10]}\"}}")
                    data = {"text": text}
                    yield f"data: {json.dumps(data, ensure_ascii=False)}\n\n"
            
            yield "data: [DONE]\n\n"
            logger.info("OpenAI 流式响应完成")
        except Exception as e:
            logger.error(f"OpenAI API 调用失败: {str(e)}")
            yield f"data: {{\"text\":\"错误：{str(e)}\"}}\n\n"
            yield "data: [DONE]\n\n"
        return

    logger.warning(f"未知的 provider: {provider}")
    yield f"data: {{\"text\":\"错误：未知的 provider: {provider}\"}}\n\n"
    yield "data: [DONE]\n\n"


@app.get("/")
async def root():
    logger.info("健康检查请求")
    return {
        "message": "AI Chat Server is running",
        "version": "1.0.0"
    }


@app.post("/chat")
async def chat(request: Request, chat_request: ChatRequest):
    client_host = request.client.host if request.client else "unknown"
    logger.info(f"收到请求 {{\"method\":\"POST\",\"url\":\"/chat\",\"client\":\"{client_host}\"}}")
    logger.info(f"解析请求参数 {{\"provider\":\"{chat_request.provider}\",\"inputLength\":{len(chat_request.input)}}}")

    async def generate():
        async for chunk in stream_model(chat_request.provider, chat_request.input):
            yield chunk

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


if __name__ == "__main__":
    import uvicorn
    logger.info(f"启动 AI Chat Server，监听端口: {PORT}")
    uvicorn.run(app, host="0.0.0.0", port=PORT)
