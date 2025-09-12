from fastapi import APIRouter
from app.api.v1.items import router as items_router

# 创建主路由器
router = APIRouter()

# 包含子路由器
router.include_router(items_router)

# 未来可以添加更多路由模块
# from app.api.v1.users import router as users_router
# router.include_router(users_router)