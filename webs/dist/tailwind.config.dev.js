"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * @Date: 2024-04-02 17:43:53
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-02 17:46:07
 * @FilePath: \fast7990.github.io\webs\tailwind.config.js
 */

/** @type {import('tailwindcss').Config} */
var _default = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'primary': '#0052cc'
      }
    }
  },
  plugins: []
};
exports["default"] = _default;