from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.db import Base

# 项目数据模型
class ItemDB(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    description = Column(String(500), nullable=True)
    price = Column(Float)
    is_available = Column(Boolean, default=True)