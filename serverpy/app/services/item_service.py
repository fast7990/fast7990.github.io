from sqlalchemy.orm import Session
from app.models.item import ItemDB
from pydantic import BaseModel
from typing import List, Optional

# Pydantic模型用于请求和响应验证
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    is_available: bool = True

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    
    class Config:
        orm_mode = True

# 服务层：处理业务逻辑
class ItemService:
    @staticmethod
    def get_item(db: Session, item_id: int) -> Optional[ItemDB]:
        return db.query(ItemDB).filter(ItemDB.id == item_id).first()
    
    @staticmethod
    def get_items(db: Session, skip: int = 0, limit: int = 100) -> List[ItemDB]:
        return db.query(ItemDB).offset(skip).limit(limit).all()
    
    @staticmethod
    def create_item(db: Session, item: ItemCreate) -> ItemDB:
        db_item = ItemDB(
            name=item.name,
            description=item.description,
            price=item.price,
            is_available=item.is_available
        )
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    
    @staticmethod
    def update_item(db: Session, item_id: int, item: ItemBase) -> Optional[ItemDB]:
        db_item = ItemService.get_item(db, item_id)
        if db_item:
            db_item.name = item.name
            db_item.description = item.description
            db_item.price = item.price
            db_item.is_available = item.is_available
            db.commit()
            db.refresh(db_item)
        return db_item
    
    @staticmethod
    def delete_item(db: Session, item_id: int) -> bool:
        db_item = ItemService.get_item(db, item_id)
        if db_item:
            db.delete(db_item)
            db.commit()
            return True
        return False