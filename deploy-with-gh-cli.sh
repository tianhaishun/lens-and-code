#!/bin/bash

echo "🎬 部署 Lens & Code 博客 - 使用 GitHub CLI"
echo "============================================="
echo ""

# 检查是否安装了 GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ 未安装 GitHub CLI"
    echo ""
    echo "请选择："
    echo ""
    echo "A. 安装 GitHub CLI（推荐）"
    echo "   在终端运行："
    echo "   brew install gh"
    echo "   然后运行: gh auth login"
    echo ""
    echo "B. 使用手动方式（见方法 2）"
    echo ""
    exit 1
fi

# 检查是否已登录
if ! gh auth status &> /dev/null; then
    echo "⚠️  未登录 GitHub"
    echo ""
    echo "请先登录："
    echo "  gh auth login"
    echo ""
    echo "选择："
    echo "  1. GitHub.com"
    echo "  2. HTTPS"
    echo "  3. Login with a web browser (最简单)"
    echo ""
    exit 1
fi

echo "✓ 已登录 GitHub"
echo ""

# 检查目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行"
    exit 1
fi

# 初始化 Git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git..."
    git init
    git add .
    git commit -m "Initial commit: Lens & Code blog"
    echo "✓ Git 仓库已初始化"
fi

# 使用 gh 创建仓库并推送
echo "🚀 创建仓库并推送..."
gh repo create lens-and-code --public --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "📝 下一步："
    echo "1. 访问: https://github.com/tianhaishun/lens-and-code/settings/pages"
    echo "2. Source 选择: GitHub Actions"
    echo "3. 等待 3-5 分钟"
    echo "4. 访问: https://tianhaishun.github.io/lens-and-code/"
else
    echo ""
    echo "❌ 失败。仓库可能已存在。"
    echo ""
    echo "如果仓库已存在，运行："
    echo "  git remote add origin https://github.com/tianhaishun/lens-and-code.git"
    echo "  git push -u origin main"
fi
