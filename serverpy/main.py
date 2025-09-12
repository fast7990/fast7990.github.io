# 应用入口文件
# 此文件作为应用的简单入口点，导入并使用app/main.py中的应用实例

from app.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)