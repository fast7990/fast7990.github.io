from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.db import get_db
from app.services.item_service import ItemService, Item, ItemCreate

# 创建路由器
router = APIRouter(
    prefix="/items",
    tags=["items"],  # 用于文档分类
    responses={404: {"description": "未找到"}},
)

# API端点：获取单个项目
@router.get("/{item_id}", response_model=Item)
def read_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    db_item = ItemService.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="项目未找到")
    return db_item

# API端点：获取所有项目
@router.get("/", response_model=List[Item])
def read_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    items = ItemService.get_items(db, skip=skip, limit=limit)
    return items

# API端点：创建项目
@router.post("/", response_model=Item)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db)
):
    return ItemService.create_item(db=db, item=item)

# API端点：更新项目
@router.put("/{item_id}", response_model=Item)
def update_item(
    item_id: int,
    item: ItemCreate,
    db: Session = Depends(get_db)
):
    db_item = ItemService.update_item(db=db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="项目未找到")
    return db_item

# API端点：删除项目
@router.delete("/{item_id}")
def delete_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    success = ItemService.delete_item(db=db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail="项目未找到")
    return {"message": "项目已成功删除"}