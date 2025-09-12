from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from fastapi import APIRouter, Depends

from app.database.db import get_db
from app.services.user_service import UserService, User, UserCreate

# 创建路由器
router = APIRouter(
    prefix="/users",
    tags=["users"],  # 用于文档分类
    responses={404: {"description": "未找到"}},
)

# API端点：获取单个用户
@router.get("/{user_id}")
def read_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    db_user = UserService.get_user(db, user_id=user_id)
    if db_user is None:
        return {"errno": 404, "data": None, "msg": "用户未找到"}
    # 将ORM对象转换为字典
    user_dict = {
        "id": db_user.id,
        "username": db_user.username,
        "full_name": db_user.full_name,
        "email": db_user.email,
        "phone_number": db_user.phone_number,
        "description": db_user.description,
        "is_active": db_user.is_active,
        "created_at": db_user.created_at
    }
    return {"errno": 0, "data": user_dict, "msg": "获取成功"}

# API端点：根据邮箱获取用户
@router.get("/by-email/{email}")
def read_user_by_email(
    email: str,
    db: Session = Depends(get_db)
):
    db_user = UserService.get_user_by_email(db, email=email)
    if db_user is None:
        return {"errno": 404, "data": None, "msg": "用户未找到"}
    # 将ORM对象转换为字典
    user_dict = {
        "id": db_user.id,
        "username": db_user.username,
        "full_name": db_user.full_name,
        "email": db_user.email,
        "phone_number": db_user.phone_number,
        "description": db_user.description,
        "is_active": db_user.is_active,
        "created_at": db_user.created_at
    }
    return {"errno": 0, "data": user_dict, "msg": "获取成功"}

# API端点：根据用户名获取用户
@router.get("/by-username/{username}")
def read_user_by_username(
    username: str,
    db: Session = Depends(get_db)
):
    db_user = UserService.get_user_by_username(db, username=username)
    if db_user is None:
        return {"errno": 404, "data": None, "msg": "用户未找到"}
    # 将ORM对象转换为字典
    user_dict = {
        "id": db_user.id,
        "username": db_user.username,
        "full_name": db_user.full_name,
        "email": db_user.email,
        "phone_number": db_user.phone_number,
        "description": db_user.description,
        "is_active": db_user.is_active,
        "created_at": db_user.created_at
    }
    return {"errno": 0, "data": user_dict, "msg": "获取成功"}

# API端点：获取所有用户
@router.get("/")
def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    users = UserService.get_users(db, skip=skip, limit=limit)
    # 将ORM对象列表转换为字典列表
    users_list = []
    for user in users:
        users_list.append({
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "phone_number": user.phone_number,
            "description": user.description,
            "is_active": user.is_active,
            "created_at": user.created_at
        })
    return {"errno": 0, "data": users_list, "msg": "获取成功"}

# API端点：创建用户
@router.post("/")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    try:
        db_user = UserService.create_user(db=db, user=user)
        # 将ORM对象转换为字典
        user_dict = {
            "id": db_user.id,
            "username": db_user.username,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "phone_number": db_user.phone_number,
            "description": db_user.description,
            "is_active": db_user.is_active,
            "created_at": db_user.created_at
        }
        return {"errno": 0, "data": user_dict, "msg": "创建成功"}
    except ValueError as e:
        return {"errno": 400, "data": None, "msg": str(e)}

# API端点：更新用户
@router.put("/{user_id}")
def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    try:
        db_user = UserService.update_user(db=db, user_id=user_id, user=user)
        if db_user is None:
            return {"errno": 404, "data": None, "msg": "用户未找到"}
        # 将ORM对象转换为字典
        user_dict = {
            "id": db_user.id,
            "username": db_user.username,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "phone_number": db_user.phone_number,
            "description": db_user.description,
            "is_active": db_user.is_active,
            "created_at": db_user.created_at
        }
        return {"errno": 0, "data": user_dict, "msg": "更新成功"}
    except ValueError as e:
        return {"errno": 400, "data": None, "msg": str(e)}

# API端点：删除用户
@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    success = UserService.delete_user(db=db, user_id=user_id)
    if not success:
        return {"errno": 404, "data": None, "msg": "用户未找到"}
    return {"errno": 0, "data": None, "msg": "删除成功"}