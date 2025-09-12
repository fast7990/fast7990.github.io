from app.database.db import Base, engine
from app.models.user import UserDB  # 导入用户模型

# 创建所有数据库表
def init_db():
    print("正在初始化数据库...")
    Base.metadata.create_all(bind=engine)  # 创建所有表
    print("数据库初始化完成！")

if __name__ == "__main__":
    init_db()