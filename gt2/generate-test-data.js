const fs = require('fs');
const path = require('path');

// 生成模拟的链接关系数据
const generateTestData = () => {
  const testData = {
    baseUrl: "https://example.com",
    baseDomain: "example.com",
    visitedUrls: [
      "https://example.com",
      "https://example.com/products",
      "https://example.com/login",
      "https://example.com/register",
      "https://example.com/product/1",
      "https://example.com/product/2",
      "https://example.com/cart",
      "https://example.com/checkout",
      "https://example.com/order-confirm",
      "https://example.com/user/orders",
      "https://example.com/user/profile"
    ],
    linkRelations: {
      "https://example.com": [
        "https://example.com/products",
        "https://example.com/login",
        "https://example.com/register"
      ],
      "https://example.com/products": [
        "https://example.com/product/1",
        "https://example.com/product/2"
      ],
      "https://example.com/login": [
        "https://example.com/user/profile",
        "https://example.com/cart"
      ],
      "https://example.com/register": [
        "https://example.com/login"
      ],
      "https://example.com/product/1": [
        "https://example.com/cart",
        "https://example.com/products"
      ],
      "https://example.com/product/2": [
        "https://example.com/cart",
        "https://example.com/products"
      ],
      "https://example.com/cart": [
        "https://example.com/checkout",
        "https://example.com/products"
      ],
      "https://example.com/checkout": [
        "https://example.com/order-confirm",
        "https://example.com/cart"
      ],
      "https://example.com/order-confirm": [
        "https://example.com/user/orders"
      ],
      "https://example.com/user/orders": [
        "https://example.com/user/profile"
      ],
      "https://example.com/user/profile": [
        "https://example.com/login"
      ]
    }
  };
  
  return testData;
};

// 主函数
const main = () => {
  console.log('生成测试数据...');
  
  // 生成测试数据
  const testData = generateTestData();
  
  // 保存为 JSON 文件
  const jsonFilePath = path.join(__dirname, 'link-relations.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(testData, null, 2), 'utf8');
  console.log(`测试数据已保存到: ${jsonFilePath}`);
  
  // 生成 Graphviz DOT 文件
  const dotContent = generateDotFile(testData);
  const dotFilePath = path.join(__dirname, 'website-links.dot');
  fs.writeFileSync(dotFilePath, dotContent, 'utf8');
  console.log(`Graphviz DOT 文件已生成: ${dotFilePath}`);
  
  console.log('\n测试数据生成完成！');
  console.log('接下来可以运行: node visualize.js 生成 D3.js 可视化页面');
};

// 生成 Graphviz DOT 文件
const generateDotFile = (data) => {
  let dotContent = 'digraph WebsiteLinks {\n';
  dotContent += '  rankdir=LR;\n';
  dotContent += '  node [shape=box, style=filled, fillcolor=lightblue];\n';
  dotContent += '  edge [color=gray, penwidth=1.0];\n\n';
  
  // 添加节点和边
  for (const [sourceUrl, targets] of Object.entries(data.linkRelations)) {
    const sourceLabel = getUrlLabel(sourceUrl);
    
    for (const targetUrl of targets) {
      const targetLabel = getUrlLabel(targetUrl);
      dotContent += `  "${sourceLabel}" -> "${targetLabel}";\n`;
    }
  }
  
  dotContent += '}\n';
  return dotContent;
};

// 获取 URL 的简短标签
const getUrlLabel = (url) => {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;
  
  if (pathname === '/') return '首页';
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  
  const pathMap = {
    '/products': '产品列表',
    '/login': '登录',
    '/register': '注册',
    '/product/1': '产品详情1',
    '/product/2': '产品详情2',
    '/cart': '购物车',
    '/checkout': '结账',
    '/order-confirm': '订单确认',
    '/user/orders': '我的订单',
    '/user/profile': '个人资料'
  };
  
  return pathMap[pathname] || pathname.split('/').pop() || '页面';
};

// 执行主函数
main();