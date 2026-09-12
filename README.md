# deepseekv5 · 个人主页

个人主页源码，纯静态，由 GitHub Pages 托管在 <https://deepseekv5.github.io/>。

## 目录结构

```
.
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
└── README.md
```

## 本地预览

```bash
python3 -m http.server 8124
# 打开 http://127.0.0.1:8124
```

## 常见修改

| 想改什么 | 改哪儿 |
| --- | --- |
| 头像 | `index.html` 中两处 `avatars.githubusercontent.com/u/321712656` 的 `img`（加载失败会自动降级为 d5 字样） |
| 作品列表 | `assets/js/main.js` 里的 `PROJECTS` 数组 |
| 工作室跳转链接 | `assets/js/main.js` 顶部 `STUDIO` 常量 |
| 配色 / 主题变量 | `assets/css/style.css` 顶部 `:root` 与 `[data-theme]` 块 |
| 联系邮箱 | `index.html` 联系区底部注释掉的 mailto 按钮 |

## 相关站点

- 巨天工作室官网：<https://deepseekv5.github.io/jutian-studio/>
- GitHub：<https://github.com/deepseekv5>
