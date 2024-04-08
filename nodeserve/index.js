// 引入相关模块
const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {

    // 设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.status = 200;
    res.respond = false;

    let sentText = '这一段很长的文本，主要用来测试sse技术的实施，这一段很长的文本，主要用来测试sse技术的实施'

    let count = 0;
    const interval = setInterval(() => {
        const data = {
            message: sentText[count]
        };
        const eventData = `data: ${JSON.stringify(data)}\n\n`;
        res.write(eventData);
        if (count >= sentText.length) {
            count = 0;
            clearInterval(interval);
            res.end();
        }
        count++;
    }, 100);

    // 监听连接关闭事件，清除定时器
    res.on('close', () => {
        count = 0;
        clearInterval(interval);
    });
})
// 启动服务器
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});