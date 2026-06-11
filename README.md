# RankRadar — React 版本

Amazon 卖家关键词排名追踪 + AI 智能销售诊断工具。

## 本地运行

```bash
# 1. 安装依赖（第一次需要，之后不用）
npm install

# 2. 启动开发服务器
npm start

# 浏览器会自动打开 http://localhost:3000
```

## 上线到 Vercel

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录（会打开浏览器让你登录 Vercel 账号）
vercel login

# 3. 部署（在项目目录下运行）
vercel --prod
```

## 项目结构

```
src/
├── App.js               # 主布局（侧边栏 + 内容区）
├── context/
│   └── LangContext.js   # 语言状态管理（5种语言）
├── data/
│   └── i18n.js          # 所有翻译文本
├── components/
│   ├── Sidebar.js        # 左侧导航栏
│   ├── Topbar.js         # 顶部栏（含语言切换）
│   ├── LangDropdown.js   # 语言下拉菜单
│   └── DiagnosticCard.js # 诊断卡片（可复用）
└── pages/
    └── DiagnosticsPage.js # 诊断页面
```

## 添加新页面

1. 在 `src/pages/` 新建 `YourPage.js`
2. 在 `src/App.js` 的 `renderPage()` 里加一个 `case`
3. 在 `src/components/Sidebar.js` 的导航数组里加入入口

## 环境变量

创建 `.env.local` 文件：
```
REACT_APP_RAINFOREST_API_KEY=你的key
REACT_APP_SUPABASE_URL=你的url
REACT_APP_SUPABASE_ANON_KEY=你的key
```
