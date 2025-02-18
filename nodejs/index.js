const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

app.get('/events', (req, res) => {
  console.log('Client connected to /events');

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let eventCount = 0;
  let count = 0;
  let clientConnected = true;

  const interval = setInterval(() => {
    if (count < 5 && clientConnected) {
      eventCount++;
      res.write(`id: ${eventCount}\n`);
      res.write(`event: my-event\n`);
      res.write(`data: Hello, this is event number ${eventCount} from the server.\n\n`);
      count++;
    } else {
      clearInterval(interval);
      if (clientConnected) {
        res.write('event: close\n');
        res.end(); // 结束响应
      }
    }
  }, 1000);

  req.on('close', () => {
    console.log('Client disconnected');
    clientConnected = false;
    clearInterval(interval);
    res.end();
  });

  req.on('error', (error) => {
    console.error('Error sending event:', error);
    clientConnected = false;
    clearInterval(interval);
    res.end();
  });
});