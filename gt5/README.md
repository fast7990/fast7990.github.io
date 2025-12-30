# GT5 智能聊天应用

一个基于 Vue 3 + Node.js 的现代化聊天应用，支持多 AI 模型（OpenAI GPT-4o-mini 和 Anthropic Claude-3-5-sonnet）。

## ✨ 特性

- 🏗️ **前后端分离架构**：Vue 3 前端 + Node.js 后端
- 🤖 **多模型支持**：灵活切换 OpenAI 和 Anthropic AI
- 💬 **优雅的聊天界面**：基于 Element Plus 的现代 UI 设计
- 🔧 **TypeScript 全面支持**：后端代码类型安全
- 🚀 **快速开发体验**：Vite 构建 + 热重载

## 🏗️ 项目结构

```
gt5/
├── node/                          # 后端服务 (TypeScript)
│   ├── src/
│   │   ├── main.ts               # CLI 模式入口
│   ├── .env.example              # 环境变量模板
│   ├── package.json
│   └── tsconfig.json
│
└── web/                          # 前端应用 (Vue 3 + Vite)
    ├── src/
    │   ├── components/
    │   │   └── Chat.vue         # 聊天组件
    │   ├── App.vue              # 根组件
    │   └── main.js              # 应用入口
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn
- OpenAI API Key 或 Anthropic API Key

### 1. 安装依赖

```bash
# 安装后端依赖
cd node
npm install

# 安装前端依赖
cd ../web
npm install
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cd node
cp .env.example .env

# 编辑 .env 文件，填入你的 API Key
# OPENAI_API_KEY=your_openai_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. 启动服务

**终端 1 - 启动后端服务：**

```bash
cd node
npm run dev          # 启动 HTTP 服务器
```

**终端 2 - 启动前端应用：**

```bash
cd web
npm run dev          # 启动 Vite 开发服务器
```

### 4. 访问应用

打开浏览器访问：[http://localhost:5173](http://localhost:5173)

## 📡 API 文档

### 聊天接口

**端点：** `POST /chat`

**请求头：**
```
Content-Type: application/json
```

**请求体：**
```json
{
  "provider": "openai",      // AI 提供商：openai | anthropic | echo
  "input": "你好，请介绍一下你自己"  // 用户输入
}
```

**响应：**
```json
{
  "text": "你好！我是 AI 助手，很高兴为你服务。"
}
```

**错误响应：**
```json
{
  "error": "Missing OPENAI_API_KEY"
}
```

### 示例

使用 curl 测试：

```bash
# 使用 OpenAI
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "input": "你好"}'

# 使用 Anthropic
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"provider": "anthropic", "input": "你好"}'
```

## 🎮 使用说明

1. **选择 AI 模型**：在聊天界面顶部选择使用 OpenAI 或 Anthropic
2. **发送消息**：在输入框中输入内容，按回车或点击发送按钮
3. **查看回复**：AI 会实时生成回复并显示在聊天界面
4. **Echo 模式**：如果没有配置 API Key，系统会回显输入内容

## 🛠️ 可用脚本

### 后端脚本 (node/)

```bash
npm run build      # 编译 TypeScript 到 dist/
npm run dev        # 开发模式运行 (tsx)
npm run serve      # 启动 HTTP 服务器
npm start          # 运行编译后的生产版本
npm run start:server  # 运行编译后的服务器版本
```

### 前端脚本 (web/)

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览生产构建
```

## ⚙️ 环境变量

在 `node/.env` 文件中配置：

| 变量名 | 必填 | 描述 |
|--------|------|------|
| `OPENAI_API_KEY` | ❌ | OpenAI API Key |
| `ANTHROPIC_API_KEY` | ❌ | Anthropic API Key |
| `PORT` | ❌ | 服务器端口 (默认 8787) |

**优先级：** 如果同时设置了 OpenAI 和 Anthropic 的 Key，系统会优先使用 Anthropic。

## 🧪 测试 CLI 模式

后端支持命令行交互模式：

```bash
cd node
npm run dev -- "你好，世界"
```

输出：
```
你好！我是 Claude，很高兴为你服务。
```

## 🔧 技术栈

### 后端
- **Runtime**: Node.js
- **Language**: TypeScript
- **AI Framework**: LangChain.js
- **Models**: OpenAI GPT-4o-mini, Anthropic Claude-3-5-sonnet

### 前端
- **Framework**: Vue 3
- **Build Tool**: Vite
- **UI Library**: Element Plus + vue-element-plus-x
- **Styling**: SCSS

## 📝 注意事项

1. **API Key 安全**：不要将 `.env` 文件提交到版本控制
2. **跨域支持**：后端已配置 CORS，允许前端跨域访问
3. **端口冲突**：如果 8787 或 5173 端口被占用，请修改环境变量
4. **网络问题**：确保能够访问 OpenAI/Anthropic 的 API 服务器

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [LangChain.js](https://js.langchain.com/) - AI 应用开发框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI 组件库
- [Vite](https://vite.dev/) - 下一代前端构建工具
