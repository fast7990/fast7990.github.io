from sqlalchemy import Column, Integer, String, Boolean
from app.database.db import Base

# 用户数据模型
class UserDB(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), index=True, unique=True, nullable=False)  # 用户名，唯一且必填
    full_name = Column(String(100), nullable=True)  # 全名，可选
    email = Column(String(100), index=True, unique=True, nullable=False)  # 邮箱，唯一且必填
    phone_number = Column(String(20), nullable=True)  # 手机号，可选
    description = Column(String(500), nullable=True)  # 描述信息，可选
    is_active = Column(Boolean, default=True)  # 是否激活
    created_at = Column(String(50), nullable=True)  # 创建时间，这里使用字符串类型以简化实现