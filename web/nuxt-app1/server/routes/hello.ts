/*
 * @Date: 2024-12-17 16:27:09
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-17 16:35:21
 * @FilePath: \nuxt-app1\server\routes\hello.ts
 */
export default defineEventHandler(() => {
  return {
    index: 404,
    body: { message: "Not Found" },
  };
});
