#!/bin/bash

echo "🚀 启动个人网站项目..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查 Python 是否安装
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python 未安装，请先安装 Python 3"
    exit 1
fi

# 确定Python命令
if command -v python3 &> /dev/null; then
    PYTHON_CMD=python3
    PIP_CMD=pip3
else
    PYTHON_CMD=python
    PIP_CMD=pip
fi

echo "📦 安装前端依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 前端依赖安装失败"
    exit 1
fi

echo "📦 安装后端依赖..."
cd backend
$PIP_CMD install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ 后端依赖安装失败"
    exit 1
fi

cd ..

echo "🎉 依赖安装完成！"
echo ""
echo "🌐 启动服务器..."
echo "   前端服务器: http://localhost:3000"
echo "   后端API: http://localhost:5000"
echo ""
echo "📝 管理员账号："
echo "   用户名: admin"
echo "   密码: admin123"
echo ""
echo "⚡ 正在启动后端服务器..."

# 启动后端服务器（后台运行）
cd backend
$PYTHON_CMD app.py &
BACKEND_PID=$!
cd ..

# 等待后端启动
sleep 3

echo "⚡ 正在启动前端服务器..."
# 启动前端服务器
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ 服务器启动完成！"
echo "🔗 请在浏览器中访问: http://localhost:3000"
echo ""
echo "💡 按 Ctrl+C 停止所有服务器"

# 等待用户中断
wait $FRONTEND_PID $BACKEND_PID