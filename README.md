# 📚 在线图书管理系统 (Bookstore SPA)

一个现代化的在线图书管理系统，使用 React + TypeScript + Redux Toolkit 构建，支持图书的增删改查、批量操作、排序筛选等功能。

## ✨ 功能特性

### 📖 图书管理
- ✅ 添加新图书
- ✅ 编辑图书信息
- ✅ 删除单个图书
- ✅ 批量选择和删除图书
- ✅ 全选/取消全选功能

### 🔍 排序筛选
- 📝 按书名排序 (支持中文拼音排序)
- 💰 按价格排序
- 👤 按作者排序
- 🔄 升序/降序切换

### 🤖 智能导入
- 📷 支持通过图片封面 OCR 识别导入图书信息
- 🔍 自动识别书名、作者、价格等信息
- ✅ 质量检查和标记待校对内容

### 🎨 用户界面
- 📱 响应式设计，支持移动端
- 🎯 现代化 UI 设计
- ⚡ 流畅的用户体验
- 🌈 渐变背景和卡片式布局

## 🛠️ 技术栈

- **前端框架**: React 18.2.0
- **开发语言**: TypeScript 5.3.0
- **状态管理**: Redux Toolkit 1.9.7
- **构建工具**: Vite 5.0.0
- **样式**: CSS Modules + 自定义样式
- **包管理**: npm

## 🚀 快速开始

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```
应用将在 `http://localhost:5173` 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
bookstore/
├── public/                 # 静态资源
│   ├── books.json         # 图书数据 (JSON格式)
│   └── *.jpg              # 图书封面图片
├── src/
│   ├── components/        # React 组件
│   │   ├── BookCard.tsx   # 图书卡片组件
│   │   ├── BookForm.tsx   # 图书表单组件
│   │   └── Modal.tsx      # 模态框组件
│   ├── data/              # 数据文件
│   │   ├── ocrBooks.ts    # OCR识别导入的图书数据
│   │   └── ocrBooks.js    # JavaScript版本
│   ├── store.ts           # Redux 状态管理
│   ├── App.tsx            # 主应用组件
│   ├── App.css            # 应用样式
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── dist/                  # 构建输出目录
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明
```

## 📊 数据结构

### Book 接口
```typescript
interface Book {
  id: string           // 图书唯一标识
  title: string        // 书名
  author: string       // 作者
  price: number        // 价格
  category: string     // 分类
  description?: string // 描述
  cover?: string       // 封面图片路径
  selected?: boolean   // 是否选中 (用于批量操作)
}
```

## 🎯 使用说明

### 添加图书
1. 点击工具栏的 "+ 添加书籍" 按钮
2. 填写图书信息（书名、作者、价格、分类等）
3. 点击保存

### 编辑图书
1. 在图书卡片上点击编辑按钮
2. 修改图书信息
3. 点击保存

### 删除图书
- **单个删除**: 点击图书卡片上的删除按钮
- **批量删除**: 勾选要删除的图书，点击"删除选中"按钮

### 排序图书
1. 使用右上角的下拉菜单选择排序方式
2. 点击排序按钮切换升序/降序

## 🔧 开发说明

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 使用 Redux Toolkit 进行状态管理
- 组件化开发，提高代码复用性

### 样式设计
- 使用 CSS 变量管理主题色
- 响应式设计，支持不同屏幕尺寸
- 现代化 UI 设计，良好的用户体验

## 📝 更新日志

### v1.0.0 (2026-04-15)
- ✨ 初始版本发布
- 📖 完整的图书管理功能
- 🔍 多种排序方式
- 🤖 OCR 图书信息导入
- 📱 响应式设计优化
- 🎨 现代化 UI 界面

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

本项目采用 MIT 许可证。