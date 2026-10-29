# 在线工具集合 - 前端源码

本站主应用的前端源码目录，基于 Vue 3 + Vite 构建。站点整体介绍与部署说明见[项目根目录 README](../README.md)。

## ✨ 功能特性

### 实用工具

- **JSON 格式化** - 格式化、压缩、校验 JSON 数据
- **图片转 Base64** - 将图片转换为 Base64 编码，支持拖拽上传
- **二维码生成** - 生成自定义样式的二维码，支持下载
- **Markdown 预览** - 实时编辑与预览 Markdown 文档

### 趣味实验

- **粒子碰撞效果** - Canvas 粒子系统物理碰撞
- **渐变色彩生成器** - 随机渐变方案，可导出 CSS 代码
- **音频可视化** - Web Audio 频谱可视化
- **3D 旋转立方体** - CSS 3D 变换
- **波浪动画** - SVG 路径动画
- **星空背景** - 动态闪烁星空

## 🎨 视觉效果

- 深色主题 + 霓虹渐变风格
- 全屏粒子背景动画
- 毛玻璃效果容器
- 响应式设计，适配桌面端、平板、移动端

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4（Hash 模式）
- **粒子效果**: tsparticles
- **二维码**: qrcode
- **Markdown**: markdown-it
- **样式**: CSS3 + CSS Variables

## 📦 安装

```bash
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
│   │   ├── About.vue         # 关于页
│   │   ├── JsonFormatter.vue # JSON 格式化工具
│   │   ├── ImageToBase64.vue # 图片转 Base64 工具
│   │   ├── QrcodeGenerator.vue # 二维码生成工具
│   │   ├── MarkdownPreview.vue # Markdown 预览工具
│   │   ├── Experiments.vue   # 趣味实验入口页
│   │   └── experiments/      # 趣味实验页面
│   │       ├── ParticleCollision.vue # 粒子碰撞
│   │       ├── GradientGenerator.vue # 渐变色彩生成器
│   │       ├── AudioVisualizer.vue   # 音频可视化
│   │       ├── Cube3d.vue            # 3D 旋转立方体
│   │       ├── WaveAnimation.vue     # 波浪动画
│   │       └── StarryNight.vue       # 星空背景
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
- 线上地址: https://fast7990.github.io/

## 📝 注意事项

1. 所有工具功能均在浏览器端完成，无需后端服务器
2. 构建产物会自动复制到项目根目录，用于 GitHub Pages 部署
3. 支持深色模式，视觉效果在暗色背景下最佳

## 📧 联系方式

如有意见或建议，请发送邮件至: fast7990@outlook.com
