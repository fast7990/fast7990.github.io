/*
 * @Date: 2024-03-15 17:10:16
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-02 17:55:03
 * @FilePath: \fast7990.github.io\webs\vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
export default defineConfig({
  base: "./",
  plugins: [vue()],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // 自动匹配文件后缀名
  },
  //新增
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
