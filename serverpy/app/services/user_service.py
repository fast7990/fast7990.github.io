from app.models.user import UserDB
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime

# Pydantic模型用于请求和响应验证
class UserBase(BaseModel):
    username: str
    full_name: Optional[str] = None
    email: EmailStr  # 使用EmailStr进行邮箱格式验证
    phone_number: Optional[str] = None
    description: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: Optional[str] = None  # 创建时间，只读字段
    
    class Config:
        from_attributes = True

# 服务层：处理用户相关业务逻辑
class UserService:
    @staticmethod
    def get_user(db: Session, user_id: int) -> Optional[UserDB]:
        return db.query(UserDB).filter(UserDB.id == user_id).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[UserDB]:
        return db.query(UserDB).filter(UserDB.email == email).first()
    
    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[UserDB]:
        return db.query(UserDB).filter(UserDB.username == username).first()
    
    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[UserDB]:
        return db.query(UserDB).offset(skip).limit(limit).all()
    
    @staticmethod
    def create_user(db: Session, user: UserCreate) -> UserDB:
        # 检查邮箱和用户名是否已存在
        existing_email = UserService.get_user_by_email(db, email=user.email)
        if existing_email:
            raise ValueError("邮箱已被注册")
        
        existing_username = UserService.get_user_by_username(db, username=user.username)
        if existing_username:
            raise ValueError("用户名已被使用")
        
        # 创建用户记录
        db_user = UserDB(
            username=user.username,
            full_name=user.full_name,
            email=user.email,
            phone_number=user.phone_number,
            description=user.description,
            is_active=user.is_active,
            created_at=datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 设置创建时间
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def update_user(db: Session, user_id: int, user: UserBase) -> Optional[UserDB]:
        db_user = UserService.get_user(db, user_id)
        if db_user:
            # 检查新的邮箱是否已被其他用户使用
            if user.email != db_user.email:
                existing_email = UserService.get_user_by_email(db, email=user.email)
                if existing_email and existing_email.id != user_id:
                    raise ValueError("邮箱已被注册")
            
            # 检查新的用户名是否已被其他用户使用
            if user.username != db_user.username:
                existing_username = UserService.get_user_by_username(db, username=user.username)
                if existing_username and existing_username.id != user_id:
                    raise ValueError("用户名已被使用")
            
            # 更新用户信息
            db_user.username = user.username
            db_user.full_name = user.full_name
            db_user.email = user.email
            db_user.phone_number = user.phone_number
            db_user.description = user.description
            db_user.is_active = user.is_active
            db.commit()
            db.refresh(db_user)
        return db_user
    
    @staticmethod
    def delete_user(db: Session, user_id: int) -> bool:
        db_user = UserService.get_user(db, user_id)
        if db_user:
            db.delete(db_user)
            db.commit()
            return True
        return False

# 导入必要的模块
from datetime import datetime