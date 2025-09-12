# 用户管理系统

这是一个基于FastAPI的用户管理系统，提供了完整的项目结构和基础功能，实现了用户数据的增删改查等操作。

## 项目结构

```
serverpy/
├── venv/                # Python虚拟环境
├── app/                 # 应用主目录
│   ├── api/             # API路由
│   │   └── v1/          # API版本1
│   │       ├── users.py # 用户相关API
│   │       └── __init__.py # 路由聚合
│   ├── models/          # 数据模型
│   │   └── user.py      # 用户模型
│   ├── services/        # 业务逻辑层
│   │   └── user_service.py # 用户服务
│   ├── database/        # 数据库配置
│   │   └── db.py        # 数据库连接配置
│   └── main.py          # 应用入口
├── config.py            # 配置文件
├── requirements.txt     # 项目依赖
├── run.sh               # 启动脚本
├── init_db.py           # 数据库初始化脚本
└── README.md            # 项目说明
```

## 功能特性

- **完整的用户管理功能**：包括用户的创建、查询、更新和删除
- **数据验证**：使用Pydantic进行请求和响应数据验证
- **数据库集成**：使用SQLAlchemy ORM进行数据库操作
- **唯一性约束**：用户名和邮箱在系统中保持唯一
- **错误处理**：完善的错误处理和状态码返回
- **中文文档**：API文档支持中文显示
- **CORS支持**：配置了跨域资源共享

## 技术栈

- **Python**：主要开发语言
- **FastAPI**：现代化、高性能的Web框架
- **SQLAlchemy**：Python SQL工具包和对象关系映射器
- **Pydantic**：数据验证和设置管理
- **SQLite**：默认数据库（可替换为其他数据库）
- **Uvicorn**：ASGI服务器

## 用户数据结构

用户模型包含以下字段：

- `id`：用户ID（主键）
- `username`：用户名（唯一，必填）
- `full_name`：全名（可选）
- `email`：邮箱（唯一，必填）
- `phone_number`：手机号（可选）
- `is_active`：是否激活（默认为True）
- `created_at`：创建时间

## API端点

### 用户管理

- **获取所有用户**：`GET /api/v1/users/`
  - 参数：`skip`（可选，默认0），`limit`（可选，默认100）
  - 返回：用户列表

- **获取单个用户**：`GET /api/v1/users/{user_id}`
  - 参数：`user_id`（用户ID）
  - 返回：用户详情

- **通过邮箱获取用户**：`GET /api/v1/users/by-email/{email}`
  - 参数：`email`（用户邮箱）
  - 返回：用户详情

- **通过用户名获取用户**：`GET /api/v1/users/by-username/{username}`
  - 参数：`username`（用户名）
  - 返回：用户详情

- **创建用户**：`POST /api/v1/users/`
  - 请求体：`UserCreate`模型（username, email必填）
  - 返回：创建的用户详情

- **更新用户**：`PUT /api/v1/users/{user_id}`
  - 参数：`user_id`（用户ID）
  - 请求体：`UserCreate`模型
  - 返回：更新后的用户详情

- **删除用户**：`DELETE /api/v1/users/{user_id}`
  - 参数：`user_id`（用户ID）
  - 返回：无内容（204状态码）

## 快速开始

### 1. 安装依赖

```bash
# 激活虚拟环境
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 2. 初始化数据库

```bash
python init_db.py
```

### 3. 运行应用

```bash
# 方法1：使用启动脚本
./run.sh

# 方法2：直接运行
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. 访问API文档

- Swagger UI：`http://localhost:8000/docs`
- ReDoc：`http://localhost:8000/redoc`

## 扩展方法

### 添加新的API端点

1. 在`app/api/v1/`目录下创建新的路由文件
2. 在`app/api/v1/__init__.py`中包含新的路由

### 添加新的数据模型

1. 在`app/models/`目录下创建新的模型文件
2. 创建相应的服务层和API层文件

### 数据库配置

可以在`config.py`中修改数据库连接字符串，切换到其他数据库如PostgreSQL或MySQL。

## 生产环境部署建议

1. 使用Gunicorn作为WSGI服务器
2. 配置HTTPS
3. 限制CORS来源
4. 使用环境变量管理敏感配置
5. 配置日志记录
6. 考虑添加用户认证和授权功能