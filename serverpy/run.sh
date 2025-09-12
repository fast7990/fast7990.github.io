#!/bin/bash

# 启动FastAPI应用
# 确保有执行权限：chmod +x run.sh

# 激活虚拟环境
source venv/bin/activate

# 启动应用，使用热重载模式
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000