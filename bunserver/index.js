/*
 * @Date: 2024-04-16 18:04:49
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-16 18:48:47
 * @FilePath: \fast7990.github.io\bunserver\index.js
 */
const server = Bun.serve({
    port: 3000,
    fetch(request) {
      console.log('server',request);
      return new Response("Welcome to Bun!");
    },
  });
  
  console.log(`Listening on localhost:${server.port}`);