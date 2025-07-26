# 🌟 个人网站项目

一个现代化、响应式的个人网站，展示个人信息、专业履历和联系方式。

## 🚀 部署状态

✅ **项目已优化用于静态部署**
- 支持 GitHub Pages、Netlify、Vercel 等平台
- 无需后端服务器即可正常运行
- 自动适配各种浏览器和设备

## ✨ 功能特性

### 🎨 前端界面 (React)
- ✅ **现代化导航栏** - 包含关于我、专业履历、联系我三个主要模块
- ✅ **关于我页面** - 展示个人信息、技能标签、兴趣爱好等
- ✅ **专业履历页面** - 三个专业领域的详细展示，支持展开/收起
- ✅ **联系我页面** - 联系表单和留言功能
- ✅ **管理员后台** - 消息管理和数据配置
- ✅ **完全响应式设计** - 完美支持桌面、平板、手机

### 🛠️ 技术特性
- ✅ **React 18** - 现代化前端框架
- ✅ **CSS Grid & Flexbox** - 灵活的响应式布局
- ✅ **CSS变量系统** - 支持主题色彩动态切换
- ✅ **渐进式增强** - 优雅降级，确保在各种环境下都能正常运行
- ✅ **性能优化** - 代码分割、懒加载、图片优化

## 📦 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/itleoli/personalweb.git
cd personalweb

# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问 http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 构建文件将在 build/ 目录中
```

## 🌐 部署指南

### 1. GitHub Pages 部署

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 在 package.json 中添加
"homepage": "https://itleoli.github.io/personalweb",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# 部署
npm run deploy
```

### 2. Netlify 部署

1. 连接 GitHub 仓库到 Netlify
2. 构建设置：
   - 构建命令：`npm run build`
   - 发布目录：`build`
3. 点击部署

### 3. Vercel 部署

1. 导入 GitHub 仓库到 Vercel
2. Vercel 会自动检测 React 项目
3. 点击部署

## ⚙️ 配置说明

### JSON 数据配置

项目支持通过 JSON 文件动态配置内容：

- `data/about.json` - 个人信息配置
- `data/experience.json` - 专业履历配置
- `data/admin.json` - 管理员配置

### 环境变量

```bash
# 开发环境
NODE_ENV=development

# 生产环境
NODE_ENV=production
```

## 🔧 故障排除

### 常见问题及解决方案

#### 1. 部署后页面空白
- **原因**: 路径配置问题
- **解决**: 确保 `package.json` 中的 `homepage` 字段正确

#### 2. 图片不显示
- **原因**: 图片路径问题
- **解决**: 将图片放在 `public/images/` 目录下

#### 3. CSS 样式不生效
- **原因**: 浏览器兼容性问题
- **解决**: 项目已包含自动降级处理

#### 4. API 请求失败
- **原因**: 静态部署无后端服务
- **解决**: 项目会自动使用默认数据，无需后端

### 浏览器支持

- ✅ Chrome (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Edge (最新版本)
- ⚠️ IE 11 (基础功能支持)

## 📱 响应式断点

- **超大屏**: 1400px+
- **大屏**: 1200px - 1399px
- **中屏**: 1024px - 1199px
- **平板**: 768px - 1023px
- **手机**: 320px - 767px

## 🎨 设计系统

### 主色调
- 主色：`#667eea`
- 辅色：`#764ba2`
- 强调色：`#f093fb`

### 字体系统
- 主字体：-apple-system, BlinkMacSystemFont, 'Segoe UI'
- 标题：clamp(2.5rem, 5vw, 4rem)
- 正文：1.05rem - 1.15rem

## 📄 许可证

MIT License - 可自由使用、修改和分发

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📞 联系方式

- **GitHub**: [itleoli](https://github.com/itleoli)
- **项目地址**: [personalweb](https://github.com/itleoli/personalweb)

---

⭐ 如果这个项目对您有帮助，请给个 Star！