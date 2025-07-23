

# ChatH5

ChatH5 是一个基于 H5 的轻量级聊天应用，提供基本的翻译功能和语言练习功能。

## 功能特点

- 语音输入：通过 `audioRecorder.js` 提供语音录制功能
- 实时翻译：支持中英文互译
- 语言练习：提供语言学习和练习模式
- 响应式设计：适配移动端和桌面端
- 主题切换：支持亮色和暗色主题

## 技术栈

- 前端：HTML5/CSS3/JavaScript
- 样式框架：Bootstrap 5
- 辅助库：jQuery
- 字体图标：Font Awesome
- 响应式布局：媒体查询
- 语音处理：Recorder.js

## 文件结构

- `index.html` - 主聊天界面
- `languagePractice.html` - 语言练习界面
- `style/` - 静态资源目录
  - `audioRecorder.js` - 语音录制处理
  - `getParams.js` - URL 参数处理
  - `rem.js` - 适配处理
  - `translation.js` - 翻译处理
  - `jquery.min.js` - jQuery 核心
  - `layui.mobile.js` - 移动端 UI 框架
  - `bootstrap.min.js` - Bootstrap 核心
  - `recorder.js` - 语音录制核心
  - `css/` - 样式文件
    - `bootstrap.min.css` - Bootstrap 样式
    - `common.css` - 通用样式
    - `iconfont.css` - 自定义图标
    - `layer.css` - 弹层样式
    - `tailwindcss.css` - Tailwind CSS

## 使用说明

1. 打开 `index.html` 进入主聊天界面
2. 使用语音或文本输入进行聊天
3. 点击翻译按钮实现中英文互译
4. 打开 `languagePractice.html` 进入语言练习模式

## 适配说明

通过 `rem.js` 实现响应式适配，自动根据设备宽度调整 HTML 元素的字体大小

```javascript
(function() {
  function setHtmlSize() {
    var e = document.documentElement,
        t = e.clientWidth;
    t > 750 && (t = 750),
    t < 320 && (t = 320),
    e.style.fontSize = 100 * (t / 7.5) + "px"
  }
  // ...
})()
```

## 版权信息

该项目使用了多个开源库，包括：
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Font Awesome](https://fontawesome.com/)
- [Recorder.js](https://github.com/xiangyuecn/Recorder

请查看各库的原始授权文件以获取完整的版权信息。