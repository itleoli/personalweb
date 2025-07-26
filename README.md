# 个人网站项目

这是一个基于React前端和Python Flask后端的现代化个人网站，具有美观的设计和完整的功能。

## 项目特色

- 🎨 现代化的WordPress风格设计
- 📱 完全响应式设计，支持移动端
- 🚀 React前端 + Flask后端的全栈架构
- 💾 SQLite数据库存储留言信息
- 🔐 JWT认证的管理员系统
- 📝 可通过JSON文件动态配置内容

## 功能模块

### 1. 关于我
- 个人基本信息展示
- 支持JSON配置文件动态更新
- 美观的个人照片展示区域

### 2. 专业履历
- 科技创业、产品设计、团队管理三个维度
- 卡片式布局，支持悬停效果
- 内容可通过JSON文件配置

### 3. 联系我
- 联系意图选择下拉框
- 留言内容输入框
- 实时提交状态反馈

### 4. 管理后台
- 安全的JWT认证登录
- 查看所有用户留言
- 删除留言功能

## 技术栈

### 前端
- React 18
- CSS3 with Grid & Flexbox
- Axios for API calls
- 响应式设计

### 后端
- Python Flask
- SQLite数据库
- JWT身份认证
- CORS支持

## 安装和运行

### 前端设置
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 后端设置
```bash
# 进入后端目录
cd backend

# 安装Python依赖
pip install -r requirements.txt

# 启动Flask服务器
python app.py
```

## 配置文件

### 个人信息配置 (data/about.json)
```json
{
  "name": "你的姓名",
  "gender": "性别",
  "mbti": "MBTI类型",
  "profession": "职业标签",
  "bio": "个人简介"
}
```

### 履历配置 (data/experience.json)
```json
{
  "startup": "科技创业经历描述",
  "design": "产品设计经历描述", 
  "management": "团队管理经历描述"
}
```

## 管理员账号

默认管理员凭据：
- 用户名: `admin`
- 密码: `admin123`

**重要**: 在生产环境中请务必修改默认密码！

## 访问方式

- 前端：http://localhost:3000
- 后端API：http://localhost:5000
- 管理后台：点击导航栏"管理后台"按钮

## 项目结构

```
personal-website/
├── public/                 # 静态文件
├── src/                   # React源代码
│   ├── components/        # React组件
│   └── App.js            # 主应用组件
├── backend/               # Flask后端
│   ├── app.py            # 主应用文件
│   └── requirements.txt   # Python依赖
├── data/                  # 配置文件
│   ├── about.json        # 个人信息
│   └── experience.json   # 履历信息
└── README.md             # 项目说明
```

## 自定义和扩展

1. **修改个人信息**: 编辑 `data/about.json` 文件
2. **更新履历**: 编辑 `data/experience.json` 文件  
3. **更换个人照片**: 替换相应的图片文件并更新CSS
4. **修改样式**: 编辑对应的CSS文件
5. **添加新功能**: 在React组件中扩展或新增后端API

## 部署建议

### 前端部署
- 使用 `npm run build` 构建生产版本
- 部署到静态托管服务（如Netlify、Vercel）

### 后端部署
- 使用Gunicorn作为WSGI服务器
- 配置反向代理（如Nginx）
- 使用PostgreSQL替换SQLite（生产环境）

## 许可证

本项目基于MIT许可证开源。