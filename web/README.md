# 在线工具集合

一个基于 Vue 3 + Vite 构建的在线工具网站，提供 JSON 格式化、图片转 Base64、二维码生成等实用工具。

## ✨ 功能特性

- **JSON 格式化** - 格式化、压缩、校验 JSON 数据
- **图片转 Base64** - 将图片转换为 Base64 编码，支持拖拽上传
- **二维码生成** - 生成自定义样式的二维码，支持下载

## 🎨 视觉效果

- 深色主题 + 霓虹渐变风格
- 全屏粒子背景动画
- 毛玻璃效果容器
- 响应式设计，适配桌面端、平板、移动端

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4
- **粒子效果**: tsparticles
- **二维码**: qrcode
- **样式**: CSS3 + CSS Variables

## 📦 安装

```bash
# 进入项目目录
cd web

# 安装依赖
npm install
```

## 🚀 运行

```bash
# 开发模式
npm run dev

# 生产构建（构建产物会自动复制到项目根目录）
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
web/
├── src/
│   ├── components/          # 公共组件
│   │   ├── ParticlesBg.vue   # 粒子背景组件
│   │   ├── NavBar.vue        # 导航栏组件
│   │   ├── ToolCard.vue      # 工具卡片组件
│   │   └── GlassContainer.vue # 毛玻璃容器组件
│   ├── views/               # 页面视图
│   │   ├── Home.vue          # 首页
│   │   ├── JsonFormatter.vue # JSON 格式化工具
│   │   ├── ImageToBase64.vue # 图片转 Base64 工具
│   │   └── QrcodeGenerator.vue # 二维码生成工具
│   ├── composables/         # 组合式函数
│   │   ├── useClipboard.js   # 剪贴板操作
│   │   └── useResponsive.js  # 响应式断点检测
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── assets/              # 静态资源
│   │   └── styles/           # 样式文件
│   │       ├── variables.css # CSS 变量定义
│   │       ├── global.css    # 全局样式
│   │       └── animations.css # 动画定义
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── scripts/                 # 脚本
│   └── post-build.mjs       # 构建后脚本（复制产物到根目录）
├── public/                  # 静态文件
├── vite.config.js           # Vite 配置
├── package.json
└── DESIGN.md                # 设计文档
```

## 🌐 访问地址

- 开发环境: http://localhost:5173
- 预览环境: http://localhost:4173

## 📝 注意事项

1. 所有工具功能均在浏览器端完成，无需后端服务器
2. 构建产物会自动复制到项目根目录 (`e:\web\fast7990.github.io\`)
3. 支持深色模式，视觉效果在暗色背景下最佳

## 📧 联系方式

如有意见或建议，请发送邮件至: fast7990@outlook.com
