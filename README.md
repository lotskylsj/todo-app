# Vue3 组件示例项目

这是一个基于 Vue 3 + TypeScript 开发的组件示例项目，包含多个实用组件和功能模块，展示了 Vue 3 的核心特性和最佳实践。

## 项目特性

- **Vue 3 Composition API**：使用最新的组合式 API 进行开发
- **TypeScript**：类型安全的代码编写
- **Pinia**：轻量级状态管理
- **Vue Router**：页面路由管理
- **响应式设计**：适配不同屏幕尺寸
- **模块化组件**：清晰的组件结构和职责划分

## 功能模块

1. **计数器**：基本的计数器功能，支持增减操作
2. **数值加法器**：输入两个数值并计算它们的和
3. **产品查找**：根据 ID 查找产品信息
4. **用户信息**：查看当前登录用户的详细信息
5. **待办事项**：管理个人待办任务，支持添加、编辑、删除和优先级设置

## 技术栈

- **前端框架**：Vue 3
- **类型系统**：TypeScript
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **构建工具**：Vite
- **CSS 框架**：Tailwind CSS（可选）

## 安装和运行

### 前提条件

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本

### 安装步骤

1. 克隆项目到本地

```bash
git clone <repository-url>
cd vue3-homework
```

2. 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

3. 启动开发服务器

```bash
npm run dev
# 或使用 yarn
yarn dev
```

4. 构建生产版本

```bash
npm run build
# 或使用 yarn
yarn build
```

## 项目结构

```
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 资源文件
│   ├── components/     # 组件
│   ├── stores/         # Pinia 状态管理
│   ├── views/          # 页面视图
│   ├── router/         # 路由配置
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── build/              # 构建输出目录
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
└── README.md           # 项目说明
```

## 认证流程

项目实现了简单的认证功能：

1. **登录**：使用用户名 `admin` 和密码 `123456` 登录
2. **登出**：在仪表盘页面点击登出按钮
3. **页面授权**：未登录用户访问受保护页面时会被重定向到登录页面

## 待办事项功能

待办事项模块支持以下功能：

- 添加新待办事项
- 标记待办事项为已完成
- 编辑待办事项
- 删除待办事项
- 设置待办事项优先级
- 本地存储持久化

## 部署

项目可以部署到任何静态网站托管服务，如：

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### 部署到 Vercel

1. 访问 [Vercel 官网](https://vercel.com/)
2. 登录并创建新项目
3. 导入您的 GitHub 仓库
4. 配置部署设置（使用默认设置即可）
5. 点击 "Deploy" 按钮

## 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建新的组件文件
2. 在 `src/views/` 目录下创建对应的页面视图
3. 在 `src/router/index.ts` 中添加路由配置

### 添加新状态管理

1. 在 `src/stores/` 目录下创建新的 store 文件
2. 使用 Pinia 的 `defineStore` 函数定义状态管理

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件

## 联系方式

如果您有任何问题或建议，请随时联系我们。

---

**注**：这是一个示例项目，用于学习和演示 Vue 3 的核心特性和最佳实践。