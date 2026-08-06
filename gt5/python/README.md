# AI Chat Server - Python 版本

基于 FastAPI 和 LangChain 的 AI 对话服务，支持流式输出。

## 功能特性

- ✅ 支持多个 AI 模型提供商（Anthropic、OpenAI）
- ✅ 流式响应输出（Server-Sent Events）
- ✅ Markdown 格式支持
- ✅ 结构化日志输出
- ✅ CORS 跨域支持
- ✅ Echo 测试模式

## 技术栈

- **FastAPI** - 高性能 Web 框架
- **LangChain** - AI 应用开发框架
- **Uvicorn** - ASGI 服务器
- **Pydantic** - 数据验证

## 项目结构

```
python/
├── main.py              # 主服务文件
├── requirements.txt     # Python 依赖
├── .env.example        # 环境变量示例
└── README.md           # 项目文档
```

## 快速开始

### 1. 安装依赖

```bash
cd python
pip install -r requirements.txt
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并配置 API 密钥：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
PORT=8787

# Anthropic API 配置
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_API_BASE_URL=http://claudecode.geelib.360.cn:8083

# OpenAI API 配置
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 启动服务

```bash
python main.py
```

或使用 uvicorn：

```bash
uvicorn main:app --host 0.0.0.0 --port 8787
```

服务将在 `http://localhost:8787` 启动。

## API 接口

### POST /chat

发送聊天请求并获取流式响应。

**请求示例：**

```bash
curl -N -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"provider":"anthropic","input":"你好，请介绍一下自己"}'
```

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| provider | string | 否 | AI 模型提供商，可选值：`anthropic`、`openai`、`echo`（默认：`echo`） |
| input | string | 是 | 用户输入内容 |

**响应格式（Server-Sent Events）：**

```
data: {"text":"你好"}
data: {"text":"！"}
data: {"text":"我是"}
data: [DONE]
```

### GET /

健康检查接口。

**响应示例：**

```json
{
  "message": "AI Chat Server is running",
  "version": "1.0.0"
}
```

## 使用示例

### 使用 Anthropic 模型

```bash
curl -N -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"provider":"anthropic","input":"写一个 Python Hello World"}'
```

### 使用 OpenAI 模型

```bash
curl -N -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","input":"解释什么是机器学习"}'
```

### 使用 Echo 测试模式

```bash
curl -N -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"provider":"echo","input":"测试消息"}'
```

## 日志输出

服务使用结构化日志格式，便于调试和监控：

```
[2025-12-29T09:00:00.000Z] [INFO] 收到请求 {"method":"POST","url":"http://localhost:8787/chat","client":"127.0.0.1"}
[2025-12-29T09:00:00.100Z] [INFO] 解析请求参数 {"provider":"anthropic","inputLength":10}
[2025-12-29T09:00:00.200Z] [DEBUG] 开始流式调用 Anthropic API...
[2025-12-29T09:00:05.000Z] [DEBUG] 发送数据块 {"textLength":2,"textPreview":"你好"}
[2025-12-29T09:00:05.500Z] [INFO] 流式响应完成
```

## 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| PORT | 服务端口 | 8787 |
| ANTHROPIC_API_KEY | Anthropic API 密钥 | - |
| ANTHROPIC_API_BASE_URL | Anthropic API 地址 | http://claudecode.geelib.360.cn:8083 |
| OPENAI_API_KEY | OpenAI API 密钥 | - |

## 开发说明

### 添加新的 AI 模型提供商

1. 在 `Provider` 枚举中添加新的提供商
2. 在 `stream_model` 函数中添加对应的处理逻辑
3. 更新 API 文档

### 自定义日志级别

修改 `main.py` 中的日志配置：

```python
logging.basicConfig(
    level=logging.DEBUG,  # 改为 DEBUG、INFO、WARNING、ERROR
    format='[%(asctime)s] [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%dT%H:%M:%S.%fZ'
)
```

## 故障排查

### 问题：无法连接到 Anthropic API

**解决方案：**
- 检查 `ANTHROPIC_API_KEY` 是否正确配置
- 确认 `ANTHROPIC_API_BASE_URL` 是否可访问
- 查看日志中的错误信息

### 问题：流式响应中断

**解决方案：**
- 检查网络连接是否稳定
- 确认 API 密钥是否有足够的配额
- 查看服务端日志中的错误信息

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或 Pull Request。
