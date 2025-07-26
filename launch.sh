#!/bin/bash

echo "🚀 启动个人网站项目..."
echo ""

# 检查依赖
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装"
    exit 1
fi

echo "✅ 环境检查通过"
echo ""

# 停止可能运行的旧进程
echo "🛑 停止旧服务..."
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "python3 app.py" 2>/dev/null || true
sleep 2

# 启动后端
echo "⚡ 启动Flask后端服务器..."
cd backend
python3 app.py &
BACKEND_PID=$!
cd ..
sleep 3

# 检查后端是否启动成功
if curl -s http://localhost:5000/api/about >/dev/null; then
    echo "✅ 后端服务器启动成功 (PID: $BACKEND_PID)"
else
    echo "❌ 后端服务器启动失败"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# 启动前端
echo "⚡ 启动React前端服务器..."
export BROWSER=none
export HOST=0.0.0.0
npm start &
FRONTEND_PID=$!
sleep 5

# 检查前端是否启动成功
if curl -s http://localhost:3000 >/dev/null; then
    echo "✅ 前端服务器启动成功 (PID: $FRONTEND_PID)"
else
    echo "❌ 前端服务器启动失败"
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "🎉 所有服务启动成功！"
echo ""
echo "📱 访问地址："
echo "   主网站: http://localhost:3000"
echo "   后端API: http://localhost:5000"
echo ""
echo "🔐 管理员登录："
echo "   用户名: admin"
echo "   密码: admin123"
echo ""
echo "🌐 如果在远程服务器上，请将localhost替换为您的服务器IP地址"
echo ""
echo "💡 按 Ctrl+C 停止所有服务器"

# 监控进程
trap 'echo ""; echo "🛑 正在停止服务器..."; kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; exit' INT

# 等待进程
while kill -0 $FRONTEND_PID 2>/dev/null && kill -0 $BACKEND_PID 2>/dev/null; do
    sleep 1
done

echo "❌ 服务器意外停止"