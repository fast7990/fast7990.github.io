/*
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-11 17:27:03
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-11 18:13:41
 * @FilePath: \fast7990.github.io\web\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import setupConfig from "./config";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import viteCompression from "vite-plugin-compression";

export default ({ command, mode }: { command: any; mode: any }) => {
    const { build } = setupConfig({ mode });
    const plugins = [];
    if (mode === "lib") {
        plugins.push(cssInjectedByJsPlugin());
    } else {
        plugins.push(
            viteCompression({
                threshold: 10240,
            })
        );
    }
    return defineConfig({
        root: path.resolve(__dirname, "src/app"), // 修改root参数为多页面的根目录
        base: "./",
        plugins: [
            vue(),
            Components({
                resolvers: [NaiveUiResolver()],
            }),
            viteMockServe({
                mockPath: "./mock",
                localEnabled: command === "serve" && mode === "mock", //在开发环境中启用 mock
            }),
            ...plugins,
        ],
        publicDir: "public",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                __ROOT__: path.resolve(__dirname, ""),
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // 自动匹配文件后缀名
        },
        build,
        server: {
            host: "localhost",
            port: 5173,
            proxy: {
                "/api": {
                    target: "https://vite.itnavs.com/",
                    changeOrigin: true,
                },
            },
        },
    });
};
