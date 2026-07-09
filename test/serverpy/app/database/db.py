from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# 创建数据库引擎
sqlalchemy_database_url = settings.DATABASE_URL
engine = create_engine(
    sqlalchemy_database_url,
    connect_args=settings.DATABASE_CONNECT_ARGS
)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建Base类，用于继承创建数据库模型
Base = declarative_base()

# 依赖项：获取数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()