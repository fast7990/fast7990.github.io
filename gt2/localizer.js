const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

class PageLocalizer {
  constructor() {
    this.linkRelations = {};
    this.baseUrl = '';
    this.baseDomain = '';
    this.outputDir = './local-website';
    this.resourcesMap = new Map(); // 资源URL到本地路径的映射
  }

  // 加载链接关系数据
  loadLinkRelations(filename = 'link-relations.json') {
    if (fs.existsSync(filename)) {
      const rawData = fs.readFileSync(filename, 'utf-8');
      const data = JSON.parse(rawData);
      this.linkRelations = data.linkRelations;
      this.baseUrl = data.baseUrl;
      this.baseDomain = data.baseDomain;
      console.log(`✅ 加载链接关系数据成功，包含 ${Object.keys(this.linkRelations).length} 个页面`);
      return true;
    } else {
      console.error(`❌ 文件 ${filename} 不存在，请先运行抓取脚本`);
      return false;
    }
  }

  // 创建输出目录
  createOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`📁 创建输出目录: ${this.outputDir}`);
    }
  }

  // 下载单个资源
  async downloadResource(resourceUrl, localPath) {
    return new Promise((resolve, reject) => {
      const protocol = resourceUrl.startsWith('https') ? https : http;
      
      protocol.get(resourceUrl, (response) => {
        if (response.statusCode === 200) {
          const dir = path.dirname(localPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          
          const fileStream = fs.createWriteStream(localPath);
          response.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`📥 下载成功: ${resourceUrl} -> ${localPath}`);
            this.resourcesMap.set(resourceUrl, localPath);
            resolve(localPath);
          });
        } else {
          console.error(`❌ 下载失败 (${response.statusCode}): ${resourceUrl}`);
          resolve(null);
        }
      }).on('error', (error) => {
        console.error(`❌ 下载错误: ${resourceUrl} - ${error.message}`);
        resolve(null);
      });
    });
  }

  // 提取页面中的资源链接
  extractResources(html, pageUrl) {
    const $ = cheerio.load(html);
    const resources = {
      css: [],
      js: [],
      images: [],
      links: []
    };

    // 提取 CSS 链接
    $('link[rel="stylesheet"]').each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = this.toAbsoluteUrl(href, pageUrl);
        if (absoluteUrl) {
          resources.css.push(absoluteUrl);
        }
      }
    });

    // 提取 JavaScript 链接
    $('script[src]').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        const absoluteUrl = this.toAbsoluteUrl(src, pageUrl);
        if (absoluteUrl) {
          resources.js.push(absoluteUrl);
        }
      }
    });

    // 提取图片链接
    $('img[src]').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        const absoluteUrl = this.toAbsoluteUrl(src, pageUrl);
        if (absoluteUrl) {
          resources.images.push(absoluteUrl);
        }
      }
    });

    // 提取页面链接
    $('a[href]').each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = this.toAbsoluteUrl(href, pageUrl);
        if (absoluteUrl && this.isSameDomain(absoluteUrl)) {
          resources.links.push(absoluteUrl);
        }
      }
    });

    return resources;
  }

  // 转换相对URL为绝对URL
  toAbsoluteUrl(relativeUrl, baseUrl) {
    try {
      return new URL(relativeUrl, baseUrl).href;
    } catch (e) {
      return null;
    }
  }

  // 检查URL是否属于同一域名
  isSameDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === this.baseDomain;
    } catch (e) {
      return false;
    }
  }

  // 获取本地文件路径
  getLocalPath(url) {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    
    // 处理首页
    if (pathname === '/') {
      pathname = '/index.html';
    }
    
    // 为没有扩展名的页面添加.html
    if (!path.extname(pathname)) {
      pathname += '.html';
    }
    
    return path.join(this.outputDir, pathname);
  }

  // 修正HTML中的资源引用
  fixHtmlReferences(html, pageUrl) {
    const $ = cheerio.load(html);
    const pagePath = this.getLocalPath(pageUrl);
    const pageDir = path.dirname(pagePath);

    // 修正CSS链接
    $('link[rel="stylesheet"]').each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = this.toAbsoluteUrl(href, pageUrl);
        if (absoluteUrl && this.resourcesMap.has(absoluteUrl)) {
          const localPath = this.resourcesMap.get(absoluteUrl);
          const relativePath = path.relative(pageDir, localPath).replace(/\\/g, '/');
          $(element).attr('href', relativePath);
        }
      }
    });

    // 修正JavaScript链接
    $('script[src]').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        const absoluteUrl = this.toAbsoluteUrl(src, pageUrl);
        if (absoluteUrl && this.resourcesMap.has(absoluteUrl)) {
          const localPath = this.resourcesMap.get(absoluteUrl);
          const relativePath = path.relative(pageDir, localPath).replace(/\\/g, '/');
          $(element).attr('src', relativePath);
        }
      }
    });

    // 修正图片链接
    $('img[src]').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        const absoluteUrl = this.toAbsoluteUrl(src, pageUrl);
        if (absoluteUrl && this.resourcesMap.has(absoluteUrl)) {
          const localPath = this.resourcesMap.get(absoluteUrl);
          const relativePath = path.relative(pageDir, localPath).replace(/\\/g, '/');
          $(element).attr('src', relativePath);
        }
      }
    });

    // 修正页面链接
    $('a[href]').each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = this.toAbsoluteUrl(href, pageUrl);
        if (absoluteUrl && this.isSameDomain(absoluteUrl)) {
          const localPath = this.getLocalPath(absoluteUrl);
          const relativePath = path.relative(pageDir, localPath).replace(/\\/g, '/');
          $(element).attr('href', relativePath);
        }
      }
    });

    return $.html();
  }

  // 下载页面及其资源
  async downloadPage(pageUrl) {
    console.log(`📄 处理页面: ${pageUrl}`);
    
    // 获取页面内容
    const pageContent = await this.fetchPage(pageUrl);
    if (!pageContent) return false;

    // 提取资源
    const resources = this.extractResources(pageContent, pageUrl);
    
    // 下载CSS资源
    for (const cssUrl of resources.css) {
      if (!this.resourcesMap.has(cssUrl)) {
        const localPath = this.getLocalPath(cssUrl);
        await this.downloadResource(cssUrl, localPath);
      }
    }

    // 下载JS资源
    for (const jsUrl of resources.js) {
      if (!this.resourcesMap.has(jsUrl)) {
        const localPath = this.getLocalPath(jsUrl);
        await this.downloadResource(jsUrl, localPath);
      }
    }

    // 下载图片资源
    for (const imgUrl of resources.images) {
      if (!this.resourcesMap.has(imgUrl)) {
        const localPath = this.getLocalPath(imgUrl);
        await this.downloadResource(imgUrl, localPath);
      }
    }

    // 修正HTML资源引用
    const fixedHtml = this.fixHtmlReferences(pageContent, pageUrl);
    
    // 保存HTML文件
    const localPath = this.getLocalPath(pageUrl);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localPath, fixedHtml, 'utf-8');
    this.resourcesMap.set(pageUrl, localPath);
    console.log(`📁 保存页面: ${localPath}`);
    
    return true;
  }

  // 获取页面内容
  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      
      protocol.get(url, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          if (response.statusCode === 200) {
            resolve(data);
          } else {
            console.error(`❌ 获取页面失败 (${response.statusCode}): ${url}`);
            resolve(null);
          }
        });
      }).on('error', (error) => {
        console.error(`❌ 获取页面错误: ${url} - ${error.message}`);
        resolve(null);
      });
    });
  }

  // 生成本地代码工程
  async generateLocalProject() {
    console.log('🚀 开始生成本地代码工程...');
    
    // 加载链接关系
    if (!this.loadLinkRelations()) {
      return;
    }
    
    // 创建输出目录
    this.createOutputDir();
    
    // 下载所有页面
    for (const pageUrl of Object.keys(this.linkRelations)) {
      await this.downloadPage(pageUrl);
    }
    
    // 生成README文件
    this.generateReadme();
    
    // 生成本地服务器启动脚本
    this.generateServerScript();
    
    console.log('\n🎉 本地代码工程生成完成！');
    console.log(`📁 输出目录: ${this.outputDir}`);
    console.log('\n📋 使用说明:');
    console.log('1. 进入目录: cd local-website');
    console.log('2. 启动本地服务器:');
    console.log('   - Python 3: python3 -m http.server 8000');
    console.log('   - Node.js: npx http-server -p 8000');
    console.log('3. 在浏览器中访问: http://localhost:8000');
  }

  // 生成README文件
  generateReadme() {
    const resourceCount = {
      html: Object.keys(this.linkRelations).length,
      css: Array.from(this.resourcesMap.values()).filter(p => p.endsWith('.css')).length,
      js: Array.from(this.resourcesMap.values()).filter(p => p.endsWith('.js')).length,
      images: Array.from(this.resourcesMap.values()).filter(p => ['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(path.extname(p).toLowerCase())).length
    };
    
    const readmeContent = `# 本地网站工程

## 项目说明

这是通过页面本地化工具生成的本地网站工程，保留了原始网站的结构和功能。

## 原始网站信息

- 原始URL: ${this.baseUrl}
- 域名: ${this.baseDomain}
- 生成时间: ${new Date().toLocaleString()}

## 包含的资源

- HTML文件: ${resourceCount.html} 个
- CSS样式表: ${resourceCount.css} 个
- JavaScript脚本: ${resourceCount.js} 个
- 图片资源: ${resourceCount.images} 个

## 本地运行

### 方法1: 使用Python 3

\`\`\`
cd ${this.outputDir}
python3 -m http.server 8000
\`\`\`

### 方法2: 使用Node.js http-server

\`\`\`
npm install -g http-server
cd ${this.outputDir}
http-server -p 8000
\`\`\`

### 方法3: 使用Live Server (VS Code扩展)

1. 安装VS Code扩展 "Live Server"
2. 在VS Code中打开 ${this.outputDir} 目录
3. 右键点击 index.html 文件，选择 "Open with Live Server"

## 项目结构

\`\`\`
${this.outputDir}
├── index.html          # 首页
├── css/                # CSS样式表目录
├── js/                 # JavaScript脚本目录
├── images/             # 图片资源目录
└── README.md           # 项目说明文档
\`\`\`

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
`;
    
    // 保存README文件
    fs.writeFileSync(path.join(this.outputDir, 'README.md'), readmeContent, 'utf-8');
  }

  // 生成本地服务器启动脚本
  generateServerScript() {
    // 生成Python启动脚本
    const pythonScript = `#!/usr/bin/env python3
"""
本地网站服务器启动脚本
"""

import http.server
import socketserver
import os

PORT = 8000

handler = http.server.SimpleHTTPRequestHandler

print(f"本地服务器启动，监听端口 {PORT}")
print(f"访问地址: http://localhost:{PORT}")
print("按 Ctrl+C 停止服务器")

with socketserver.TCPServer(("", PORT), handler) as httpd:
    httpd.serve_forever()
`;
    fs.writeFileSync(path.join(this.outputDir, 'start_server.py'), pythonScript, 'utf-8');
    fs.chmodSync(path.join(this.outputDir, 'start_server.py'), 0o755);

    // 生成Windows批处理脚本
    const batchScript = `@echo off
echo 本地网站服务器启动脚本
echo.  
python -m http.server 8000
echo.  
echo 服务器已停止
echo 按任意键退出...
pause > nul
`;
    fs.writeFileSync(path.join(this.outputDir, 'start_server.bat'), batchScript, 'utf-8');
  }
}

// 主函数
async function main() {
  const localizer = new PageLocalizer();
  await localizer.generateLocalProject();
}

if (require.main === module) {
  main();
}

module.exports = PageLocalizer;