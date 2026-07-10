# Tasks

## 第一阶段：项目搭建

- [x] Task 1: 初始化 Vue 3 + Vite 项目
  - [x] 1.1 在 web/ 目录下创建 Vue 3 + Vite 项目（使用 JavaScript）
  - [x] 1.2 安装核心依赖：vue, vue-router, vite
  - [x] 1.3 安装功能依赖：@tsparticles/vue3, tsparticles, qrcode
  - [x] 1.4 创建项目目录结构（components, views, composables, router, assets/styles）

- [x] Task 2: 实现全局样式系统
  - [x] 2.1 创建 variables.css（定义深色主题 CSS 变量）
  - [x] 2.2 创建 global.css（全局样式重置和基础样式）
  - [x] 2.3 创建 animations.css（定义卡片入场、渐变发光等动画）

- [x] Task 3: 实现公共组件
  - [x] 3.1 创建 ParticlesBg.vue 粒子背景组件（支持响应式降级）
  - [x] 3.2 创建 NavBar.vue 导航栏组件（含汉堡菜单）
  - [x] 3.3 创建 ToolCard.vue 工具卡片组件（含 hover 效果）
  - [x] 3.4 创建 GlassContainer.vue 毛玻璃容器组件

- [x] Task 4: 实现组合式函数
  - [x] 4.1 创建 useClipboard.js（剪贴板操作封装）
  - [x] 4.2 创建 useResponsive.js（响应式断点检测）

- [x] Task 5: 实现路由配置
  - [x] 5.1 创建 router/index.js 路由配置
  - [x] 5.2 配置路由懒加载
  - [x] 5.3 添加路由过渡动画

- [x] Task 6: 实现首页
  - [x] 6.1 创建 Home.vue 首页视图
  - [x] 6.2 实现渐变发光标题
  - [x] 6.3 实现工具卡片网格布局
  - [x] 6.4 实现卡片入场动画

- [x] Task 7: 创建 App.vue 和 main.js
  - [x] 7.1 创建 App.vue 根组件（集成粒子背景和导航栏）
  - [x] 7.2 创建 main.js 入口文件（注册路由和 tsparticles）

## 第二阶段：核心工具实现

- [x] Task 8: 实现 JSON 格式化工具
  - [x] 8.1 创建 JsonFormatter.vue 视图
  - [x] 8.2 实现 JSON 格式化/压缩功能
  - [x] 8.3 实现 JSON 语法校验和错误提示
  - [x] 8.4 实现复制和清空功能
  - [x] 8.5 实现响应式双栏/单栏布局

- [x] Task 9: 实现图片转 Base64 工具
  - [x] 9.1 创建 ImageToBase64.vue 视图
  - [x] 9.2 实现拖拽上传和点击上传
  - [x] 9.3 实现图片预览和 Base64 生成
  - [x] 9.4 实现复制功能和成功反馈
  - [x] 9.5 实现响应式布局

- [x] Task 10: 实现二维码生成工具
  - [x] 10.1 创建 QrcodeGenerator.vue 视图
  - [x] 10.2 实现二维码实时生成
  - [x] 10.3 实现尺寸、颜色、容错级别配置
  - [x] 10.4 实现二维码下载功能
  - [x] 10.5 实现响应式布局

## 第三阶段：验证和优化

- [x] Task 11: 功能验证
  - [x] 11.1 验证项目能正常启动
  - [x] 11.2 验证所有路由跳转正常
  - [x] 11.3 验证三个工具功能完整
  - [x] 11.4 验证响应式布局在不同断点下正常

# Task Dependencies
- Task 2, 3, 4 依赖 Task 1
- Task 5 依赖 Task 1
- Task 6 依赖 Task 2, 3, 5
- Task 7 依赖 Task 2, 3, 5
- Task 8, 9, 10 依赖 Task 2, 3, 4, 5, 7
- Task 11 依赖所有前置任务
