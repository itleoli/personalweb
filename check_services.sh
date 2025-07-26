#!/bin/bash

echo "🔍 检查个人网站服务状态..."
echo ""

# 检查进程
echo "📊 运行中的相关进程："
ps aux | grep -E "(node|python)" | grep -E "(react-scripts|app.py)" | grep -v grep || echo "   无相关进程运行"
echo ""

# 检查端口3000
echo "🌐 前端服务器状态 (端口3000):"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "   ✅ 前端服务器正常运行"
    echo "   📱 访问地址: http://localhost:3000"
else
    echo "   ❌ 前端服务器无法访问"
fi
echo ""

# 检查端口5000
echo "🔧 后端API状态 (端口5000):"
if curl -s http://localhost:5000/api/about >/dev/null; then
    echo "   ✅ 后端API正常运行"
    echo "   🔗 API地址: http://localhost:5000"
else
    echo "   ❌ 后端API无法访问"
fi
echo ""

# 检查网络监听
echo "🔌 网络监听状态:"
if command -v netstat >/dev/null; then
    netstat -tlnp | grep -E "(3000|5000)" || echo "   未发现3000或5000端口监听"
elif [ -f /proc/net/tcp ]; then
    cat /proc/net/tcp | awk 'NR>1 {gsub(/:/, " ", $2); if ($2 ~ /^0*BB8$|^0*1388$/) print "   端口", strtonum("0x"$2), "正在监听"}' 
else
    echo "   无法检查端口监听状态"
fi
echo ""

echo "💡 如果服务未运行，请执行以下命令启动："
echo "   ./launch.sh"