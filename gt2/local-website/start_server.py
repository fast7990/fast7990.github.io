#!/usr/bin/env python3
"""
本地网站服务器启动脚本
"""

import http.server
import socketserver
import os

PORT = 8000

handler = http.server.SimpleHTTPRequestHandler

print(f"本地服务器启动，监听端口 {PORT}")
print(f"访问地址: http://localhost:{PORT}")
print("按 Ctrl+C 停止服务器")

with socketserver.TCPServer(("", PORT), handler) as httpd:
    httpd.serve_forever()
