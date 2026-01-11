#!/bin/bash

# 部署到 GitHub Pages 的脚本

echo "🎬 开始部署 Cinematic Blog 到 GitHub Pages..."
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查是否已初始化 git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Cinematic Blog"
    echo ""
    echo "⚠️  请设置远程仓库："
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "然后重新运行此脚本"
    exit 0
fi

# 构建项目
echo "🔨 构建项目..."
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功！"
echo ""

# 安装 gh-pages
echo "📦 检查 gh-pages..."
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "安装 gh-pages..."
    npm install --save-dev gh-pages
fi

# 部署
echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d out -b gh-pages

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "📝 下一步："
    echo "1. 进入 GitHub 仓库设置"
    echo "2. 在 Pages 页面选择 Source 为 'Deploy from a branch'"
    echo "3. 选择 'gh-pages' 分支和 '/ (root)' 目录"
    echo "4. 保存后等待几分钟"
    echo ""
    echo "你的网站将访问：https://YOUR_USERNAME.github.io/YOUR_REPO/"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi
