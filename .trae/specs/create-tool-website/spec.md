# 工具类网站开发 Spec

## Why
用户需要一个炫酷的在线工具集合网站，提供 JSON 格式化、图片转 Base64、二维码生成等功能。网站需要深色主题、粒子背景效果、响应式设计，所有处理在浏览器端完成。

## What Changes
- 在 `web/` 目录下创建 Vue 3 + Vite 项目
- 实现深色主题 + 霓虹渐变视觉风格
- 实现 tsparticles 粒子背景动画
- 实现毛玻璃效果容器和发光按钮
- 实现首页工具卡片网格布局
- 实现 JSON 格式化工具页面
- 实现图片转 Base64 工具页面
- 实现二维码生成工具页面
- 实现响应式适配（桌面/平板/移动端）

## Impact
- Affected specs: 新建项目
- Affected code: `web/` 目录下所有文件

## ADDED Requirements

### Requirement: 项目初始化
系统 SHALL 在 `web/` 目录下创建 Vue 3 + Vite 项目，使用纯 JavaScript（非 TypeScript）。

#### Scenario: 项目创建成功
- **WHEN** 执行项目初始化
- **THEN** 生成完整的 Vue 3 + Vite 项目结构
- **THEN** 安装所有必需依赖（vue, vue-router, vite, tsparticles, qrcode）

### Requirement: 全局样式系统
系统 SHALL 实现深色主题样式系统，使用 CSS Variables 定义主题色。

#### Scenario: 深色主题应用
- **WHEN** 页面加载
- **THEN** 背景色为 `#0a0a1a`
- **THEN** 霓虹渐变色为蓝紫 `#7c3aed` 到青绿 `#06b6d4`
- **THEN** 毛玻璃效果使用 `backdrop-filter: blur(12px)`

### Requirement: 粒子背景组件
系统 SHALL 实现全局粒子背景动画，支持响应式降级。

#### Scenario: 桌面端粒子效果
- **WHEN** 在桌面端（>= 1024px）访问
- **THEN** 显示 80-100 个蓝紫色粒子
- **THEN** 粒子间距离 < 150px 时绘制连线
- **THEN** 鼠标移动时粒子产生交互效果

#### Scenario: 移动端粒子降级
- **WHEN** 在移动端（< 768px）访问
- **THEN** 粒子数量减少至 30-40 个
- **THEN** 关闭粒子连线效果

### Requirement: 导航栏组件
系统 SHALL 实现响应式导航栏，移动端使用汉堡菜单。

#### Scenario: 桌面端导航
- **WHEN** 在桌面端访问
- **THEN** 显示完整导航菜单（Logo、工具集、GitHub、关于）
- **THEN** 导航栏使用毛玻璃效果

#### Scenario: 移动端导航
- **WHEN** 在移动端访问
- **THEN** 显示汉堡菜单图标
- **THEN** 点击后展开侧边抽屉菜单

### Requirement: 首页布局
系统 SHALL 实现首页工具卡片网格布局，支持入场动画。

#### Scenario: 首页展示
- **WHEN** 访问首页
- **THEN** 显示渐变发光标题"在线工具集合"
- **THEN** 工具卡片以网格形式展示
- **THEN** 卡片依次从下方淡入（delay 递增 100ms）

#### Scenario: 卡片交互
- **WHEN** 鼠标悬停在卡片上
- **THEN** 卡片边框发光
- **THEN** 卡片向上浮动 8px
- **THEN** 图标轻微旋转/缩放

### Requirement: JSON 格式化工具
系统 SHALL 实现 JSON 格式化工具，支持格式化、压缩、校验。

#### Scenario: JSON 格式化
- **WHEN** 用户在输入区输入压缩的 JSON
- **WHEN** 点击"格式化"按钮
- **THEN** 输出区显示带缩进的美化 JSON

#### Scenario: JSON 压缩
- **WHEN** 用户在输入区输入格式化的 JSON
- **WHEN** 点击"压缩"按钮
- **THEN** 输出区显示单行压缩 JSON

#### Scenario: JSON 校验错误
- **WHEN** 用户输入无效的 JSON
- **THEN** 显示错误提示，高亮错误位置

### Requirement: 图片转 Base64 工具
系统 SHALL 实现图片转 Base64 工具，支持拖拽上传和实时预览。

#### Scenario: 图片上传
- **WHEN** 用户拖拽图片到上传区域
- **WHEN** 或点击上传区域选择图片
- **THEN** 显示图片预览
- **THEN** 生成 Base64 字符串

#### Scenario: 复制 Base64
- **WHEN** 用户点击"复制"按钮
- **THEN** Base64 字符串复制到剪贴板
- **THEN** 显示复制成功反馈

### Requirement: 二维码生成工具
系统 SHALL 实现二维码生成工具，支持自定义配置和下载。

#### Scenario: 二维码生成
- **WHEN** 用户输入文本或 URL
- **THEN** 实时生成并显示二维码

#### Scenario: 自定义配置
- **WHEN** 用户修改尺寸、颜色、容错级别
- **THEN** 二维码实时更新

#### Scenario: 下载二维码
- **WHEN** 用户点击"下载"按钮
- **THEN** 二维码以 PNG 格式下载

### Requirement: 响应式适配
系统 SHALL 实现完整的响应式布局，适配桌面/平板/移动端。

#### Scenario: 桌面端布局（>= 1024px）
- **WHEN** 在桌面端访问
- **THEN** 工具卡片 3-4 列网格
- **THEN** 工具页面双栏左右并排
- **THEN** 页面内边距 48px

#### Scenario: 平板端布局（768px - 1023px）
- **WHEN** 在平板端访问
- **THEN** 工具卡片 2 列网格
- **THEN** 工具页面双栏左右并排
- **THEN** 页面内边距 24px

#### Scenario: 移动端布局（< 768px）
- **WHEN** 在移动端访问
- **THEN** 工具卡片单列
- **THEN** 工具页面双栏改为上下堆叠
- **THEN** 页面内边距 16px

## MODIFIED Requirements
无

## REMOVED Requirements
无
