# 在线工具集合

一个基于 Vue 3 + Vite 构建的在线工具网站，提供多种实用工具与趣味前端实验。

> 访问地址：[https://fast7990.github.io/](https://fast7990.github.io/)

## 实用工具

| 工具 | 说明 |
|------|------|
| JSON 格式化 | 格式化、压缩、校验 JSON 数据 |
| 图片转 Base64 | 将图片转换为 Base64 编码，支持拖拽上传 |
| 二维码生成 | 生成自定义样式的二维码，支持下载 |
| Markdown 预览 | 实时编辑与预览 Markdown 文档 |
| LifeMap 人生轨迹地图 | 记录人生中的重要地点与轨迹 |
| 3D 数字地球 | 交互式 3D 数字地球，探索全球数据可视化 |

## 趣味实验

| 实验 | 说明 |
|------|------|
| 粒子碰撞效果 | 探索粒子系统的物理碰撞效果 |
| 渐变色彩生成器 | 随机生成美丽的渐变色彩方案，可导出 CSS 代码 |
| 音频可视化 | 将音频波形可视化，创建炫酷的音乐频谱效果 |
| 3D 旋转立方体 | 使用 CSS 3D 变换创建旋转的立方体效果 |
| 波浪动画 | 使用 SVG 路径动画创建流畅的波浪效果 |
| 星空背景 | 创建动态的星空背景，包含闪烁和移动的星星 |

## 视觉效果

- 深色主题 + 霓虹渐变风格
- 全屏粒子背景动画
- 毛玻璃效果容器
- 响应式设计，适配桌面端、平板、移动端

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4
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

# 开发模式
npm run dev

# 生产构建（产物自动复制到项目根目录）
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
.
├── web/                        # 前端源码
│   ├── src/
│   │   ├── components/         # 公共组件
│   │   ├── views/              # 页面视图
│   │   │   ── experiments/    # 趣味实验页面
│   │   ├── composables/        # 组合式函数
│   │   ├── router/             # 路由配置
│   │   ├── assets/             # 静态资源与样式
│   │   ├── App.vue             # 根组件
│   │   └── main.js             # 入口文件
│   ├── scripts/
│   │   └── post-build.mjs      # 构建后脚本
│   ├── vite.config.js
│   └── package.json
├── README.md
└── web/README.md
```

## 注意事项

1. 所有工具功能均在浏览器端完成，无需后端服务器
2. 构建产物会自动复制到项目根目录，用于 GitHub Pages 部署
3. 支持深色模式，视觉效果在暗色背景下最佳

## 联系方式

如有意见或建议，请发送邮件至: fast7990@outlook.com
