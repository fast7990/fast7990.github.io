const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class WebsiteScraper {
  constructor() {
    this.visitedUrls = new Set();
    this.linkRelations = {};
    this.baseUrl = '';
    this.baseDomain = '';
  }

  // 初始化基础URL和域名
  initializeUrl(url) {
    this.baseUrl = url;
    const urlObj = new URL(url);
    this.baseDomain = urlObj.hostname;
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

  // 转换相对URL为绝对URL
  toAbsoluteUrl(relativeUrl, baseUrl) {
    try {
      return new URL(relativeUrl, baseUrl).href;
    } catch (e) {
      return null;
    }
  }

  // 过滤无效URL
  filterUrl(url) {
    if (!url) return false;
    if (this.visitedUrls.has(url)) return false;
    if (!this.isSameDomain(url)) return false;
    if (url.includes('#')) return false; // 过滤锚点链接
    if (url.includes('javascript:')) return false; // 过滤JavaScript链接
    if (url.endsWith('.pdf') || url.endsWith('.doc') || url.endsWith('.xls')) return false; // 过滤文件链接
    return true;
  }

  // 从HTML中提取所有链接
  extractLinks(html, baseUrl) {
    const $ = cheerio.load(html);
    const links = [];

    // 提取所有<a>标签的href属性
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = this.toAbsoluteUrl(href, baseUrl);
        if (absoluteUrl && this.filterUrl(absoluteUrl)) {
          links.push(absoluteUrl);
        }
      }
    });

    return links;
  }

  // 抓取单个页面
  async scrapePage(url) {
    console.log(`正在抓取: ${url}`);
    
    let browser;
    try {
      // 优化浏览器配置，解决 net::ERR_BLOCKED_BY_CLIENT 问题
      browser = await puppeteer.launch({
        headless: 'new', // 使用新的无头模式
        args: [
          '--no-sandbox', 
          '--disable-setuid-sandbox', 
          '--disable-gpu', 
          '--disable-dev-shm-usage',
          '--ignore-certificate-errors', // 忽略 SSL 证书错误
          '--ignore-certificate-errors-spki-list',
          '--disable-web-security', // 禁用 web 安全策略
          '--disable-features=IsolateOrigins,site-per-process', // 禁用站点隔离
          '--disable-site-isolation-trials',
          '--disable-popup-blocking', // 禁用弹窗阻止
          '--disable-notifications', // 禁用通知
          '--disable-default-apps', // 禁用默认应用
          '--disable-extensions', // 禁用扩展
          '--enable-features=NetworkService,NetworkServiceInProcess',
          '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure', // 允许不安全的 Cookie
          '--user-data-dir=/tmp/puppeteer' // 使用临时用户数据目录
        ],
        ignoreHTTPSErrors: true, // 忽略 HTTPS 错误
        defaultViewport: { width: 1920, height: 1080 }, // 设置默认视口
        acceptInsecureCerts: true // 接受不安全的证书
      });
    } catch (error) {
      if (error.message.includes('Could not find Chrome') || error.message.includes('Browser was not found')) {
        console.error('❌ 找不到 Chrome 浏览器！');
        console.error('建议手动安装 Chrome 或使用其他浏览器。');
        console.error('或者尝试运行以下命令手动安装：');
        console.error('npx puppeteer browsers install chrome');
        throw new Error('Chrome 浏览器未找到，请先安装 Chrome');
      } else {
        throw error;
      }
    }
    
    try {
      const page = await browser.newPage();
      
      // 简化日志，只保留关键信息
      page.on('requestfailed', request => {
        const failure = request.failure();
        const errorText = failure ? failure.errorText : '未知错误';
        console.log(`❌ 请求失败: ${request.url()} - ${errorText}`);
      });
      
      // 禁用浏览器安全功能，防止客户端阻止
      await page.setBypassCSP(true); // 绕过内容安全策略
      // Cookie 策略通过浏览器参数设置，而非 page 方法
      
      
      // 设置更现代的 User-Agent
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // 设置 HTTP 头
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Referer': url,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      });
      
      // 访问页面，使用更宽松的等待条件
      await page.goto(url, { 
        waitUntil: 'domcontentloaded', // 只等待 DOM 加载完成
        timeout: 60000, // 延长超时时间
        referer: url
      });
      
      // 获取页面HTML
      const html = await page.content();
      
      // 提取链接
      const links = this.extractLinks(html, url);
      
      // 记录链接关系
      this.linkRelations[url] = links;
      
      // 标记为已访问
      this.visitedUrls.add(url);
      
      await browser.close();
      
      return links;
    } catch (error) {
      console.error(`抓取 ${url} 失败: ${error.message}`);
      await browser.close();
      return [];
    }
  }

  // 递归抓取网站
  async crawl(url, depth = 2) {
    if (depth <= 0) return;
    if (this.visitedUrls.has(url)) return;

    // 抓取当前页面
    const links = await this.scrapePage(url);

    // 递归抓取子页面
    for (const link of links) {
      if (depth > 1) {
        await this.crawl(link, depth - 1);
      }
    }
  }

  // 保存链接关系到JSON文件
  saveLinkRelations(filename = 'link-relations.json') {
    const data = {
      baseUrl: this.baseUrl,
      baseDomain: this.baseDomain,
      visitedUrls: Array.from(this.visitedUrls),
      linkRelations: this.linkRelations
    };
    
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`链接关系已保存到 ${filename}`);
  }

  // 生成Graphviz DOT文件
  generateDotFile(filename = 'website-links.dot') {
    let dotContent = 'digraph WebsiteLinks {\n';
    dotContent += '  rankdir=LR;\n';
    dotContent += '  node [shape=box, style=filled, fillcolor=lightblue];\n';
    dotContent += '  edge [color=gray, penwidth=1.0];\n\n';

    // 添加节点
    const nodes = new Set();
    Object.keys(this.linkRelations).forEach(source => {
      nodes.add(source);
      this.linkRelations[source].forEach(target => {
        nodes.add(target);
      });
    });

    // 添加边（链接关系）
    Object.keys(this.linkRelations).forEach(source => {
      this.linkRelations[source].forEach(target => {
        const sourceLabel = this.getUrlLabel(source);
        const targetLabel = this.getUrlLabel(target);
        dotContent += `  "${sourceLabel}" -> "${targetLabel}";\n`;
      });
    });

    dotContent += '}\n';

    fs.writeFileSync(filename, dotContent, 'utf-8');
    console.log(`DOT文件已生成: ${filename}`);
  }

  // 获取URL的简短标签
  getUrlLabel(url) {
    const urlObj = new URL(url);
    let label = urlObj.pathname;
    if (label === '/') label = '首页';
    else label = label.replace(/^\//, '').replace(/\//g, ' > ');
    return label;
  }

  // 主方法
  async run(url, depth = 2) {
    this.initializeUrl(url);
    console.log(`开始抓取网站: ${url}`);
    console.log(`域名: ${this.baseDomain}`);
    console.log(`抓取深度: ${depth}`);
    
    await this.crawl(url, depth);
    
    console.log(`\n抓取完成！`);
    console.log(`共抓取 ${this.visitedUrls.size} 个页面`);
    
    this.saveLinkRelations();
    this.generateDotFile();
    
    console.log(`\n请使用以下命令生成关系图:`);
    console.log(`dot -Tpng website-links.dot -o website-links.png`);
  }
}

// 示例用法
if (require.main === module) {
  const scraper = new WebsiteScraper();
  // 默认抓取示例网站，可根据需要修改
  const targetUrl = process.argv[2] || 'http://www.Lcyijing.cn';
  const depth = process.argv[3] ? parseInt(process.argv[3]) : 2;
  
  scraper.run(targetUrl, depth);
}

module.exports = WebsiteScraper;