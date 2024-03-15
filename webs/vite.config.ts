import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // 自动匹配文件后缀名
  },
  //新增
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "./src/styles/index.scss";', //引入scss文件
  //     },
  //   },
  // },
});
