/*
 * @Date: 2024-12-17 16:09:00
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-17 16:50:15
 * @FilePath: \nuxt-app1\server\api\test.ts
 */
export default defineEventHandler((event) => {
  // console.log("event", event);
  const cookies = parseCookies(event)
  return {
    code: 200,
    body: { message: "Not Found" },
  };
});
