# 本地网站工程

## 项目说明

这是通过页面本地化工具生成的本地网站工程，保留了原始网站的结构和功能。

## 原始网站信息

- 原始URL: http://www.Lcyijing.cn
- 域名: www.lcyijing.cn
- 生成时间: 12/12/2025, 6:15:48 PM

## 包含的资源

- HTML文件: 39 个
- CSS样式表: 3 个
- JavaScript脚本: 7 个
- 图片资源: 2 个

## 本地运行

### 方法1: 使用Python 3

```
cd ./local-website
python3 -m http.server 8000
```

### 方法2: 使用Node.js http-server

```
npm install -g http-server
cd ./local-website
http-server -p 8000
```

### 方法3: 使用Live Server (VS Code扩展)

1. 安装VS Code扩展 "Live Server"
2. 在VS Code中打开 ./local-website 目录
3. 右键点击 index.html 文件，选择 "Open with Live Server"

## 项目结构

```
./local-website
├── index.html          # 首页
├── css/                # CSS样式表目录
├── js/                 # JavaScript脚本目录
├── images/             # 图片资源目录
└── README.md           # 项目说明文档
```

## 二次开发建议

1. **保留原始结构**: 尽量保持原始网站的目录结构，便于后续更新
2. **使用版本控制**: 建议使用Git进行版本控制
3. **模块化开发**: 对复杂功能进行模块化拆分
4. **优化性能**: 压缩CSS和JavaScript文件，优化图片大小
5. **响应式设计**: 确保在不同设备上都能正常显示

## 工具说明

本工程由 PageLocalizer 工具生成，该工具可以:
- 批量下载网站资源
- 自动修正资源引用路径
- 生成完整的本地代码工程
- 支持后续二次开发
