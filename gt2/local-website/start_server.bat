@echo off
echo 本地网站服务器启动脚本
echo.  
python -m http.server 8000
echo.  
echo 服务器已停止
echo 按任意键退出...
pause > nul
