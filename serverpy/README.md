# FastAPI业务框架项目

这是一个基于FastAPI的可扩展业务框架，提供了完整的项目结构和基础功能，可以作为您业务开发的起点。

## 项目结构

```
serverpy/
├── venv/                # Python虚拟环境
├── app/                 # 应用主目录
│   ├── api/             # API路由
│   │   └── v1/          # API版本1
│   │       ├── items.py # 项目相关API
│   │       └── __init__.py # 路由聚合
│   ├── models/          # 数据模型
│   │   └── item.py      # 项目模型
│   ├── services/        # 业务逻辑层
│   │   └── item_service.py # 项目服务
│   ├── database/        # 数据库配置
│   │   └── db.py        # 数据库连接配置
│   └── main.py          # 应用入口
├── config.py            # 配置文件
├── requirements.txt     # 项目依赖
├── run.sh               # 启动脚本
└── README.md            # 项目说明
```

## 功能特性

- **完整的项目结构**：遵循FastAPI最佳实践，采用分层架构
- **数据库集成**：使用SQLAlchemy ORM，支持多种数据库
- **API文档**：自动生成Swagger UI和ReDoc文档
- **配置管理**：集中化的配置管理，支持环境变量
- **CORS支持**：内置CORS中间件，便于前端集成
- **业务示例**：提供了项目(Item)的完整CRUD示例

## 技术栈

- Python 3.13
- FastAPI 0.116.1
- SQLAlchemy 2.0.43
- Uvicorn 0.35.0
- SQLite (默认，可切换到其他数据库)

## 快速开始

### 1. 安装依赖

```bash
# 激活虚拟环境
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 2. 启动应用

使用提供的启动脚本：

```bash
./run.sh
```

或者直接运行：

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. 访问API文档

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API端点

### 基础

- `GET /` - 获取项目信息

### 项目(Item)相关

- `GET /api/v1/items/` - 获取所有项目
- `GET /api/v1/items/{item_id}` - 获取单个项目
- `POST /api/v1/items/` - 创建项目
- `PUT /api/v1/items/{item_id}` - 更新项目
- `DELETE /api/v1/items/{item_id}` - 删除项目

## 如何扩展

### 添加新的API端点

1. 在`app/models/`中创建新的数据模型
2. 在`app/services/`中创建相应的服务类
3. 在`app/api/v1/`中创建新的路由文件
4. 在`app/api/v1/__init__.py`中包含新的路由

### 数据库配置

修改`config.py`中的数据库配置：

```python
# SQLite配置
DATABASE_URL: str = "sqlite:///./app.db"
DATABASE_CONNECT_ARGS: Dict[str, Any] = {
    "check_same_thread": False,
}

# PostgreSQL配置示例
# DATABASE_URL: str = "postgresql://user:password@postgresserver/db"
# DATABASE_CONNECT_ARGS: Dict[str, Any] = {}
```

### 环境变量

可以通过环境变量覆盖配置文件中的设置：

- `DATABASE_URL` - 数据库连接URL
- `SECRET_KEY` - 加密密钥
- `DEBUG` - 调试模式开关

## 生产环境部署

在生产环境中，推荐使用Gunicorn作为WSGI服务器，配合Uvicorn工作进程：

```bash
# 安装Gunicorn
pip install gunicorn

# 运行生产服务器
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 注意事项

- 生产环境中请设置合理的`SECRET_KEY`
- 生产环境中应限制`CORS_ORIGINS`的来源
- 定期更新依赖包以确保安全性
- 考虑添加日志记录和监控

## 许可证

本项目使用MIT许可证。