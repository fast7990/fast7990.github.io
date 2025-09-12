from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import router as api_router
from app.database.db import engine, Base
from config import settings

# 创建表结构
Base.metadata.create_all(bind=engine)

# 初始化FastAPI应用
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="基于FastAPI的可扩展业务框架",
    version=settings.PROJECT_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    # 配置Swagger UI为中文
    swagger_ui_parameters={
        "defaultModelsExpandDepth": -1,  # 默认为-1，不展开模型
        "docExpansion": "none",  # 默认展开API列表
        "language": "zh-cn"  # 设置中文语言
    },
    # 配置ReDoc为中文
    redoc_kwargs={
        "spec_url": "/openapi.json",
        "title": f"{settings.PROJECT_NAME} - API文档",
        "language": "zh_cn"
    }
)

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

# 根路径
@app.get("/")
def read_root():
    return {
        "project": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "message": "欢迎使用FastAPI业务框架"
    }

# 包含API路由
app.include_router(api_router, prefix=settings.API_V1_STR)