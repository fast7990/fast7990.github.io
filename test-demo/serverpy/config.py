import os
from typing import Dict, Any

# 配置管理类
class Settings:
    # 基础配置
    PROJECT_NAME: str = "用户管理系统"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True
    
    # 数据库配置
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")  # 默认使用SQLite
    DATABASE_CONNECT_ARGS: Dict[str, Any] = {
        "check_same_thread": False,  # SQLite需要这个参数
    }
    
    # 安全配置
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # 日志配置
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # 跨域配置
    CORS_ORIGINS: list = ["*"]  # 生产环境应该限制来源
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list = ["*"]
    CORS_ALLOW_HEADERS: list = ["*"]

# 创建配置实例
settings = Settings()