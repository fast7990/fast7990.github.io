# 在线工具集合

一个基于 Vue 3 + Vite 构建的在线工具网站，提供多种实用工具与趣味前端实验，并附带若干独立静态页面。所有功能均在浏览器端完成，无需后端服务器。

> 访问地址：[https://fast7990.github.io/](https://fast7990.github.io/) · [English Docs](./README.en.md)

## 实用工具

| 工具 | 说明 | 访问路径 |
|------|------|----------|
| JSON 格式化 | 格式化、压缩、校验 JSON 数据 | [#/json-formatter](https://fast7990.github.io/#/json-formatter) |
| 图片转 Base64 | 将图片转换为 Base64 编码，支持拖拽上传 | [#/image-to-base64](https://fast7990.github.io/#/image-to-base64) |
| 二维码生成 | 生成自定义样式的二维码，支持下载 | [#/qrcode-generator](https://fast7990.github.io/#/qrcode-generator) |
| Markdown 预览 | 实时编辑与预览 Markdown 文档 | [#/markdown-preview](https://fast7990.github.io/#/markdown-preview) |
| LifeMap 人生轨迹地图 | 记录人生中的重要地点与轨迹 | [page/lifemap/](https://fast7990.github.io/page/lifemap/) |
| 3D 太阳系模型 | 交互式 3D 太阳系，支持视角控制与时间流速调节 | [page/earth3d/](https://fast7990.github.io/page/earth3d/) |

其中 LifeMap 与 3D 太阳系模型为独立静态页面，位于 `page/` 目录，不依赖主应用。

## 趣味实验

入口：[#/experiments](https://fast7990.github.io/#/experiments)

| 实验 | 说明 | 访问路径 |
|------|------|----------|
| 粒子碰撞效果 | 探索粒子系统的物理碰撞效果 | [#/experiments/particle-collision](https://fast7990.github.io/#/experiments/particle-collision) |
| 渐变色彩生成器 | 随机生成美丽的渐变色彩方案，可导出 CSS 代码 | [#/experiments/gradient-generator](https://fast7990.github.io/#/experiments/gradient-generator) |
| 音频可视化 | 将音频波形可视化，创建炫酷的音乐频谱效果 | [#/experiments/audio-visualizer](https://fast7990.github.io/#/experiments/audio-visualizer) |
| 3D 旋转立方体 | 使用 CSS 3D 变换创建旋转的立方体效果 | [#/experiments/3d-cube](https://fast7990.github.io/#/experiments/3d-cube) |
| 波浪动画 | 使用 SVG 路径动画创建流畅的波浪效果 | [#/experiments/wave-animation](https://fast7990.github.io/#/experiments/wave-animation) |
| 星空背景 | 创建动态的星空背景，包含闪烁和移动的星星 | [#/experiments/starry-night](https://fast7990.github.io/#/experiments/starry-night) |

## 视觉效果

- 深色主题 + 霓虹渐变风格
- 全屏粒子背景动画
- 毛玻璃效果容器
- 响应式设计，适配桌面端、平板、移动端

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4（Hash 模式，便于 GitHub Pages 静态部署）
- **粒子效果**: tsparticles
- **二维码**: qrcode
- **Markdown**: markdown-it
- **样式**: CSS3 + CSS Variables

## 快速开始

```bash
# 进入项目目录
cd web

# 安装依赖
npm install

# 开发模式（默认 http://localhost:5173）
npm run dev

# 生产构建（产物自动复制到项目根目录）
npm run build

# 预览构建结果（默认 http://localhost:4173）
npm run preview
```

## 项目结构

```
.
├── web/                        # 主应用前端源码
│   ├── src/
│   │   ├── components/         # 公共组件（导航栏、粒子背景、工具卡片、毛玻璃容器）
│   │   ├── views/              # 页面视图
│   │   │   ├── Home.vue        # 首页
│   │   │   ├── About.vue       # 关于页
│   │   │   ├── Experiments.vue # 趣味实验入口页
│   │   │   └── experiments/    # 各趣味实验页面
│   │   ├── composables/        # 组合式函数（剪贴板、响应式断点）
│   │   ├── router/             # 路由配置
│   │   ├── assets/             # 静态资源与样式
│   │   ├── App.vue             # 根组件
│   │   └── main.js             # 入口文件
│   ├── scripts/
│   │   └── post-build.mjs      # 构建后脚本（复制产物到根目录）
│   ├── vite.config.js
│   └── package.json
├── page/                       # 独立静态页面（构建产物）
│   ├── lifemap/                # LifeMap 人生轨迹地图
│   └── earth3d/                # 交互式 3D 太阳系模型
├── assets/                     # 主应用构建产物（JS/CSS）
├── index.html                  # 主应用入口（GitHub Pages 首页）
├── test-demo/                  # 技术验证与实验性 Demo
├── README.md                   # 中文文档
└── README.en.md                # 英文文档
```

## 部署

站点通过 GitHub Pages 部署：

1. 在 `web/` 目录执行 `npm run build`
2. 构建产物（`index.html` 与 `assets/`）由 `scripts/post-build.mjs` 自动复制到项目根目录
3. 推送根目录内容至 GitHub 仓库，GitHub Pages 即可发布

路由采用 Hash 模式（`#/xxx`），无需服务器端重写规则，刷新任意子页面均不会 404。

## 注意事项

1. 所有工具功能均在浏览器端完成，数据不会上传服务器
2. `assets/` 与根目录 `index.html` 为构建产物，请勿手动编辑，修改请在 `web/src/` 中进行
3. 支持深色模式，视觉效果在暗色背景下最佳

## 联系方式

如有意见或建议，请发送邮件至: fast7990@outlook.com
