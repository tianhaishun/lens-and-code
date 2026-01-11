#!/bin/bash

echo "🎬 部署 Lens & Code 博客到 GitHub"
echo "=================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ] || [ ! -d "app" ]; then
    echo "❌ 错误：请在 cinematic-blog 项目根目录运行此脚本"
    echo "   当前目录: $(pwd)"
    exit 1
fi

echo "✓ 找到项目文件"
echo ""

# 检查 git 是否初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    echo "✓ Git 仓库已初始化"
else
    echo "✓ Git 仓库已存在"
fi

echo ""
echo "📋 下一步操作："
echo "================"
echo ""
echo "1️⃣  添加所有文件到 Git"
echo "   git add ."
echo ""
echo "2️⃣  提交代码"
echo "   git commit -m \"Initial commit: Lens & Code blog\""
echo ""
echo "3️⃣  添加远程仓库（选择一个）"
echo ""
echo "   方式 A - HTTPS（需要 GitHub 登录）:"
echo "   git remote add origin https://github.com/tianhaishun/lens-and-code.git"
echo ""
echo "   方式 B - SSH（推荐，如果已配置 SSH key）:"
echo "   git remote add origin git@github.com:tianhaishun/lens-and-code.git"
echo ""
echo "4️⃣  推送到 GitHub"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "5️⃣  在 GitHub 网站上启用 Pages"
echo "   - 访问: https://github.com/tianhaishun/lens-and-code/settings/pages"
echo "   - Source 选择: GitHub Actions"
echo "   - 保存后等待 3-5 分钟"
echo ""
echo "=================================="
echo ""
echo "💡 提示："
echo "   - 如果遇到认证问题，GitHub 会提示你使用 Personal Access Token"
echo "   - 首次推送可能需要几分钟"
echo "   - 查看部署状态: https://github.com/tianhaishun/lens-and-code/actions"
echo ""
