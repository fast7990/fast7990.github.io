const fs = require('fs');
const path = require('path');

class LinkVisualizer {
  constructor() {
    this.data = null;
  }

  // 加载链接关系数据
  loadData(filename = 'link-relations.json') {
    if (fs.existsSync(filename)) {
      const rawData = fs.readFileSync(filename, 'utf-8');
      this.data = JSON.parse(rawData);
      console.log(`数据加载完成，共包含 ${Object.keys(this.data.linkRelations).length} 个页面`);
      return true;
    } else {
      console.error(`文件 ${filename} 不存在，请先运行抓取脚本`);
      return false;
    }
  }

  // 生成 D3.js 可视化页面
  generateD3Visualization(outputFile = 'visualization.html') {
    if (!this.data) {
      console.error('请先加载数据');
      return;
    }

    // 准备节点和链接数据
    const nodes = [];
    const links = [];
    const nodeMap = new Map();
    let nodeId = 0;

    // 创建节点
    Object.keys(this.data.linkRelations).forEach(sourceUrl => {
      if (!nodeMap.has(sourceUrl)) {
        nodeMap.set(sourceUrl, nodeId++);
        nodes.push({
          id: nodeMap.get(sourceUrl),
          name: this.getNodeName(sourceUrl),
          url: sourceUrl,
          depth: this.calculateDepth(sourceUrl)
        });
      }

      // 创建链接
      this.data.linkRelations[sourceUrl].forEach(targetUrl => {
        if (!nodeMap.has(targetUrl)) {
          nodeMap.set(targetUrl, nodeId++);
          nodes.push({
            id: nodeMap.get(targetUrl),
            name: this.getNodeName(targetUrl),
            url: targetUrl,
            depth: this.calculateDepth(targetUrl)
          });
        }

        links.push({
          source: nodeMap.get(sourceUrl),
          target: nodeMap.get(targetUrl)
        });
      });
    });

    // 生成 HTML 页面
    const htmlContent = this.generateHtml(nodes, links);

    // 保存文件
    fs.writeFileSync(outputFile, htmlContent, 'utf-8');
    console.log(`D3.js 可视化页面已生成: ${outputFile}`);
  }

  // 计算页面深度
  calculateDepth(url) {
    const baseUrl = this.data.baseUrl;
    const urlPath = new URL(url).pathname;
    const basePath = new URL(baseUrl).pathname;
    
    // 移除基础路径
    let relativePath = urlPath.replace(basePath, '');
    if (relativePath === '') return 0;
    
    // 计算路径深度
    const depth = relativePath.split('/').filter(Boolean).length;
    return Math.max(depth, 1);
  }

  // 获取节点名称
  getNodeName(url) {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    
    // 简化路径
    if (pathname === '/') {
      return '首页';
    }
    
    // 移除末尾的斜杠
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    // 按斜杠分割路径
    const pathParts = pathname.split('/').filter(Boolean);
    
    // 优先使用最后一个路径段
    const lastPart = pathParts[pathParts.length - 1];
    
    // 尝试提取页面类型
    if (lastPart.includes('product')) {
      return '产品详情页';
    } else if (lastPart.includes('category')) {
      return '产品分类页';
    } else if (lastPart.includes('cart')) {
      return '购物车';
    } else if (lastPart.includes('checkout')) {
      return '结账页';
    } else if (lastPart.includes('login')) {
      return '登录页';
    } else if (lastPart.includes('register')) {
      return '注册页';
    } else if (lastPart.includes('user')) {
      return '用户中心';
    } else if (lastPart.includes('order')) {
      return '订单页';
    }
    
    return lastPart || '页面';
  }

  // 生成 HTML 内容
  generateHtml(nodes, links) {
    // 转义模板字符串中的反引号
    const tooltipHtml = '<strong>' + '${d.name}' + '</strong><br/>' +
                       '<small>URL: ' + '${d.url}' + '</small><br/>' +
                       '<small>深度: ' + '${d.depth}' + '</small>';
    
    let htmlContent = '<!DOCTYPE html>\n';
    htmlContent += '<html lang="zh-CN">\n';
    htmlContent += '<head>\n';
    htmlContent += '    <meta charset="UTF-8">\n';
    htmlContent += '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    htmlContent += '    <title>网站链接关系图 - D3.js 可视化</title>\n';
    htmlContent += '    <script src="https://d3js.org/d3.v7.min.js"></script>\n';
    htmlContent += '    <style>\n';
    htmlContent += '        /* 全局样式 */\n';
    htmlContent += '        * {\n';
    htmlContent += '            margin: 0;\n';
    htmlContent += '            padding: 0;\n';
    htmlContent += '            box-sizing: border-box;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        body {\n';
    htmlContent += '            font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\n';
    htmlContent += '            background-color: #f5f7fa;\n';
    htmlContent += '            color: #333;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 标题和控制面板样式 */\n';
    htmlContent += '        .container {\n';
    htmlContent += '            max-width: 1200px;\n';
    htmlContent += '            margin: 0 auto;\n';
    htmlContent += '            padding: 20px;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        h1 {\n';
    htmlContent += '            text-align: center;\n';
    htmlContent += '            margin-bottom: 20px;\n';
    htmlContent += '            color: #2c3e50;\n';
    htmlContent += '            font-size: 28px;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        .stats {\n';
    htmlContent += '            text-align: center;\n';
    htmlContent += '            margin-bottom: 15px;\n';
    htmlContent += '            font-size: 14px;\n';
    htmlContent += '            color: #666;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        .controls {\n';
    htmlContent += '            display: flex;\n';
    htmlContent += '            justify-content: center;\n';
    htmlContent += '            gap: 15px;\n';
    htmlContent += '            margin-bottom: 20px;\n';
    htmlContent += '            padding: 15px;\n';
    htmlContent += '            background-color: white;\n';
    htmlContent += '            border-radius: 8px;\n';
    htmlContent += '            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        button {\n';
    htmlContent += '            padding: 10px 20px;\n';
    htmlContent += '            background-color: #3498db;\n';
    htmlContent += '            color: white;\n';
    htmlContent += '            border: none;\n';
    htmlContent += '            border-radius: 5px;\n';
    htmlContent += '            cursor: pointer;\n';
    htmlContent += '            font-size: 14px;\n';
    htmlContent += '            transition: background-color 0.3s;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        button:hover {\n';
    htmlContent += '            background-color: #2980b9;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 图表容器 */\n';
    htmlContent += '        #graph-container {\n';
    htmlContent += '            background-color: white;\n';
    htmlContent += '            border-radius: 8px;\n';
    htmlContent += '            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n';
    htmlContent += '            overflow: hidden;\n';
    htmlContent += '            position: relative;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        svg {\n';
    htmlContent += '            width: 100%;\n';
    htmlContent += '            height: 80vh;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 节点样式 */\n';
    htmlContent += '        .node {\n';
    htmlContent += '            cursor: pointer;\n';
    htmlContent += '            stroke: white;\n';
    htmlContent += '            stroke-width: 1.5px;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        .node:hover {\n';
    htmlContent += '            stroke: #2c3e50;\n';
    htmlContent += '            stroke-width: 2.5px;\n';
    htmlContent += '            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 链接样式 */\n';
    htmlContent += '        .link {\n';
    htmlContent += '            stroke: #999;\n';
    htmlContent += '            stroke-opacity: 0.6;\n';
    htmlContent += '            stroke-width: 1.5px;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 节点标签 */\n';
    htmlContent += '        .node-label {\n';
    htmlContent += '            font-size: 12px;\n';
    htmlContent += '            text-anchor: middle;\n';
    htmlContent += '            pointer-events: none;\n';
    htmlContent += '            fill: #333;\n';
    htmlContent += '            font-weight: bold;\n';
    htmlContent += '            text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8);\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 工具提示 */\n';
    htmlContent += '        .tooltip {\n';
    htmlContent += '            position: absolute;\n';
    htmlContent += '            background-color: rgba(0, 0, 0, 0.85);\n';
    htmlContent += '            color: white;\n';
    htmlContent += '            padding: 10px 15px;\n';
    htmlContent += '            border-radius: 5px;\n';
    htmlContent += '            font-size: 12px;\n';
    htmlContent += '            pointer-events: none;\n';
    htmlContent += '            z-index: 1000;\n';
    htmlContent += '            max-width: 300px;\n';
    htmlContent += '            word-wrap: break-word;\n';
    htmlContent += '            line-height: 1.4;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        /* 图例 */\n';
    htmlContent += '        .legend {\n';
    htmlContent += '            position: absolute;\n';
    htmlContent += '            top: 20px;\n';
    htmlContent += '            right: 20px;\n';
    htmlContent += '            background-color: rgba(255, 255, 255, 0.95);\n';
    htmlContent += '            padding: 15px;\n';
    htmlContent += '            border-radius: 8px;\n';
    htmlContent += '            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n';
    htmlContent += '            font-size: 12px;\n';
    htmlContent += '            z-index: 100;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        .legend-item {\n';
    htmlContent += '            display: flex;\n';
    htmlContent += '            align-items: center;\n';
    htmlContent += '            margin-bottom: 10px;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        .legend-color {\n';
    htmlContent += '            width: 20px;\n';
    htmlContent += '            height: 20px;\n';
    htmlContent += '            border-radius: 50%;\n';
    htmlContent += '            margin-right: 10px;\n';
    htmlContent += '            border: 1px solid #ddd;\n';
    htmlContent += '        }\n';
    htmlContent += '    </style>\n';
    htmlContent += '</head>\n';
    htmlContent += '<body>\n';
    htmlContent += '    <div class="container">\n';
    htmlContent += '        <h1>购物网站链接关系图</h1>\n';
    htmlContent += '        \n';
    htmlContent += '        <div class="stats">\n';
    htmlContent += '            <span>节点数: <strong>' + nodes.length + '</strong></span> | \n';
    htmlContent += '            <span>链接数: <strong>' + links.length + '</strong></span>\n';
    htmlContent += '        </div>\n';
    htmlContent += '        \n';
    htmlContent += '        <div class="controls">\n';
    htmlContent += '            <button id="reset-btn">重置视图</button>\n';
    htmlContent += '            <button id="zoom-in-btn">放大</button>\n';
    htmlContent += '            <button id="zoom-out-btn">缩小</button>\n';
    htmlContent += '            <button id="center-btn">居中</button>\n';
    htmlContent += '        </div>\n';
    htmlContent += '        \n';
    htmlContent += '        <div id="graph-container">\n';
    htmlContent += '            <svg id="graph-svg"></svg>\n';
    htmlContent += '            \n';
    htmlContent += '            <div class="legend">\n';
    htmlContent += '                <h3>节点深度</h3>\n';
    htmlContent += '                <div class="legend-item">\n';
    htmlContent += '                    <div class="legend-color" style="background-color: #69b3a2;"></div>\n';
    htmlContent += '                    <span>深度 0 (首页)</span>\n';
    htmlContent += '                </div>\n';
    htmlContent += '                <div class="legend-item">\n';
    htmlContent += '                    <div class="legend-color" style="background-color: #408080;"></div>\n';
    htmlContent += '                    <span>深度 1</span>\n';
    htmlContent += '                </div>\n';
    htmlContent += '                <div class="legend-item">\n';
    htmlContent += '                    <div class="legend-color" style="background-color: #8080c0;"></div>\n';
    htmlContent += '                    <span>深度 2</span>\n';
    htmlContent += '                </div>\n';
    htmlContent += '                <div class="legend-item">\n';
    htmlContent += '                    <div class="legend-color" style="background-color: #c08080;"></div>\n';
    htmlContent += '                    <span>深度 3+</span>\n';
    htmlContent += '                </div>\n';
    htmlContent += '            </div>\n';
    htmlContent += '        </div>\n';
    htmlContent += '    </div>\n';
    htmlContent += '    \n';
    htmlContent += '    <script>\n';
    htmlContent += '        // 节点和链接数据\n';
    htmlContent += '        const nodes = ' + JSON.stringify(nodes) + ';\n';
    htmlContent += '        const links = ' + JSON.stringify(links) + ';\n';
    htmlContent += '        \n';
    htmlContent += '        // 设置 SVG 尺寸\n';
    htmlContent += '        const svg = d3.select("#graph-svg");\n';
    htmlContent += '        const container = d3.select("#graph-container");\n';
    htmlContent += '        let width = container.node().clientWidth;\n';
    htmlContent += '        let height = container.node().clientHeight;\n';
    htmlContent += '        \n';
    htmlContent += '        // 创建缩放行为\n';
    htmlContent += '        const zoom = d3.zoom()\n';
    htmlContent += '            .scaleExtent([0.1, 3])\n';
    htmlContent += '            .on("zoom", (event) => {\n';
    htmlContent += '                g.attr("transform", event.transform);\n';
    htmlContent += '            });\n';
    htmlContent += '        \n';
    htmlContent += '        // 应用缩放\n';
    htmlContent += '        svg.call(zoom);\n';
    htmlContent += '        \n';
    htmlContent += '        // 创建主组\n';
    htmlContent += '        const g = svg.append("g");\n';
    htmlContent += '        \n';
    htmlContent += '        // 创建工具提示\n';
    htmlContent += '        const tooltip = d3.select("body")\n';
    htmlContent += '            .append("div")\n';
    htmlContent += '            .attr("class", "tooltip")\n';
    htmlContent += '            .style("opacity", 0);\n';
    htmlContent += '        \n';
    htmlContent += '        // 创建力导向模拟\n';
    htmlContent += '        const simulation = d3.forceSimulation(nodes)\n';
    htmlContent += '            .force("link", d3.forceLink(links).id(d => d.id).distance(120))\n';
    htmlContent += '            .force("charge", d3.forceManyBody().strength(-500))\n';
    htmlContent += '            .force("center", d3.forceCenter(width / 2, height / 2))\n';
    htmlContent += '            .force("collision", d3.forceCollide().radius(40));\n';
    htmlContent += '        \n';
    htmlContent += '        // 创建链接\n';
    htmlContent += '        const link = g.append("g")\n';
    htmlContent += '            .selectAll("line")\n';
    htmlContent += '            .data(links)\n';
    htmlContent += '            .enter().append("line")\n';
    htmlContent += '            .attr("class", "link");\n';
    htmlContent += '        \n';
    htmlContent += '        // 创建节点\n';
    htmlContent += '        const node = g.append("g")\n';
    htmlContent += '            .selectAll("circle")\n';
    htmlContent += '            .data(nodes)\n';
    htmlContent += '            .enter().append("circle")\n';
    htmlContent += '            .attr("class", "node")\n';
    htmlContent += '            .attr("r", 30)\n';
    htmlContent += '            .style("fill", d => {\n';
    htmlContent += '                // 根据深度设置不同颜色\n';
    htmlContent += '                const colors = ["#69b3a2", "#408080", "#8080c0", "#c08080"];\n';
    htmlContent += '                return colors[d.depth % colors.length];\n';
    htmlContent += '            })\n';
    htmlContent += '            .call(d3.drag()\n';
    htmlContent += '                .on("start", dragstarted)\n';
    htmlContent += '                .on("drag", dragged)\n';
    htmlContent += '                .on("end", dragended));\n';
    htmlContent += '        \n';
    htmlContent += '        // 添加节点标签\n';
    htmlContent += '        const labels = g.append("g")\n';
    htmlContent += '            .selectAll("text")\n';
    htmlContent += '            .data(nodes)\n';
    htmlContent += '            .enter().append("text")\n';
    htmlContent += '            .attr("class", "node-label")\n';
    htmlContent += '            .text(d => d.name);\n';
    htmlContent += '        \n';
    htmlContent += '        // 添加鼠标事件\n';
    htmlContent += '        node.on("mouseover", (event, d) => {\n';
    htmlContent += '            tooltip.transition()\n';
    htmlContent += '                .duration(200)\n';
    htmlContent += '                .style("opacity", 0.95);\n';
    htmlContent += '            tooltip.html(\n';
    htmlContent += '                "<strong>" + d.name + "</strong><br/>" +\n';
    htmlContent += '                "<small>URL: " + d.url + "</small><br/>" +\n';
    htmlContent += '                "<small>深度: " + d.depth + "</small>"\n';
    htmlContent += '            )\n';
    htmlContent += '            .style("left", (event.pageX + 15) + "px")\n';
    htmlContent += '            .style("top", (event.pageY - 28) + "px");\n';
    htmlContent += '        })\n';
    htmlContent += '        .on("mouseout", () => {\n';
    htmlContent += '            tooltip.transition()\n';
    htmlContent += '                .duration(500)\n';
    htmlContent += '                .style("opacity", 0);\n';
    htmlContent += '        });\n';
    htmlContent += '        \n';
    htmlContent += '        // 更新力导向模拟\n';
    htmlContent += '        simulation.on("tick", () => {\n';
    htmlContent += '            link\n';
    htmlContent += '                .attr("x1", d => d.source.x)\n';
    htmlContent += '                .attr("y1", d => d.source.y)\n';
    htmlContent += '                .attr("x2", d => d.target.x)\n';
    htmlContent += '                .attr("y2", d => d.target.y);\n';
    htmlContent += '            \n';
    htmlContent += '            node\n';
    htmlContent += '                .attr("cx", d => d.x)\n';
    htmlContent += '                .attr("cy", d => d.y);\n';
    htmlContent += '            \n';
    htmlContent += '            labels\n';
    htmlContent += '                .attr("x", d => d.x)\n';
    htmlContent += '                .attr("y", d => d.y + 5);\n';
    htmlContent += '        });\n';
    htmlContent += '        \n';
    htmlContent += '        // 拖拽函数\n';
    htmlContent += '        function dragstarted(event, d) {\n';
    htmlContent += '            if (!event.active) simulation.alphaTarget(0.3).restart();\n';
    htmlContent += '            d.fx = d.x;\n';
    htmlContent += '            d.fy = d.y;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        function dragged(event, d) {\n';
    htmlContent += '            d.fx = event.x;\n';
    htmlContent += '            d.fy = event.y;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        function dragended(event, d) {\n';
    htmlContent += '            if (!event.active) simulation.alphaTarget(0);\n';
    htmlContent += '            d.fx = null;\n';
    htmlContent += '            d.fy = null;\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        // 响应窗口大小变化\n';
    htmlContent += '        function resize() {\n';
    htmlContent += '            width = container.node().clientWidth;\n';
    htmlContent += '            height = container.node().clientHeight;\n';
    htmlContent += '            \n';
    htmlContent += '            svg.attr("width", width).attr("height", height);\n';
    htmlContent += '            simulation.force("center", d3.forceCenter(width / 2, height / 2));\n';
    htmlContent += '            simulation.alpha(0.3).restart();\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        window.addEventListener("resize", resize);\n';
    htmlContent += '        \n';
    htmlContent += '        // 控制面板功能\n';
    htmlContent += '        d3.select("#reset-btn").on("click", () => {\n';
    htmlContent += '            svg.transition().duration(750).call(\n';
    htmlContent += '                zoom.transform, d3.zoomIdentity\n';
    htmlContent += '            );\n';
    htmlContent += '            simulation.alpha(0.3).restart();\n';
    htmlContent += '        });\n';
    htmlContent += '        \n';
    htmlContent += '        d3.select("#zoom-in-btn").on("click", () => {\n';
    htmlContent += '            svg.transition().duration(750).call(\n';
    htmlContent += '                zoom.scaleBy, 1.3\n';
    htmlContent += '            );\n';
    htmlContent += '        });\n';
    htmlContent += '        \n';
    htmlContent += '        d3.select("#zoom-out-btn").on("click", () => {\n';
    htmlContent += '            svg.transition().duration(750).call(\n';
    htmlContent += '                zoom.scaleBy, 1 / 1.3\n';
    htmlContent += '            );\n';
    htmlContent += '        });\n';
    htmlContent += '        \n';
    htmlContent += '        d3.select("#center-btn").on("click", () => {\n';
    htmlContent += '            svg.transition().duration(750).call(\n';
    htmlContent += '                zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1)\n';
    htmlContent += '            );\n';
    htmlContent += '        });\n';
    htmlContent += '        \n';
    htmlContent += '        // 初始化尺寸\n';
    htmlContent += '        resize();\n';
    htmlContent += '    </script>\n';
    htmlContent += '</body>\n';
    htmlContent += '</html>';
    
    return htmlContent;
  }

  // 获取节点名称（基于URL路径）
  getNodeName(url) {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    
    // 简化路径
    if (pathname === '/') {
      return '首页';
    }
    
    // 移除末尾的斜杠
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    // 按斜杠分割路径
    const pathParts = pathname.split('/').filter(Boolean);
    
    // 处理特殊页面
    if (pathname.includes('login') || pathname.includes('signin')) {
      return '登录页';
    } else if (pathname.includes('register') || pathname.includes('signup')) {
      return '注册页';
    } else if (pathname.includes('cart')) {
      return '购物车';
    } else if (pathname.includes('checkout')) {
      return '结账页';
    } else if (pathname.includes('product')) {
      return '产品详情页';
    } else if (pathname.includes('category') || pathname.includes('products')) {
      return '产品列表页';
    } else if (pathname.includes('order')) {
      return '订单页';
    } else if (pathname.includes('user') || pathname.includes('account')) {
      return '用户中心';
    }
    
    // 默认使用最后一个路径段
    return pathParts[pathParts.length - 1] || '页面';
  }

  // 计算页面深度
  calculateDepth(url) {
    if (!this.data) return 0;
    
    const baseUrl = this.data.baseUrl;
    const urlObj = new URL(url);
    const baseObj = new URL(baseUrl);
    
    // 如果是首页
    if (url === baseUrl) return 0;
    
    // 移除基础URL和查询参数
    let relativePath = url.replace(baseUrl, '').split('?')[0];
    
    // 计算斜杠数量
    const depth = (relativePath.match(/\//g) || []).length;
    
    return Math.max(depth, 1);
  }
}

// 主函数
function main() {
  const visualizer = new LinkVisualizer();
  
  // 加载数据并生成可视化
  if (visualizer.loadData()) {
    visualizer.generateD3Visualization();
    console.log('\n可视化生成完成！');
    console.log('请在浏览器中打开 visualization.html 查看结果');
  }
}

// 示例用法
if (require.main === module) {
  main();
}

module.exports = LinkVisualizer;