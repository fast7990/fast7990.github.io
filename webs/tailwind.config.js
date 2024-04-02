/*
 * @Date: 2024-04-02 17:43:53
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-02 17:46:07
 * @FilePath: \fast7990.github.io\webs\tailwind.config.js
 */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#0052cc',
            }
        },
    },
    plugins: [],
}