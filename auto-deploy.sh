#!/bin/bash

# Lens & Code 博客一键部署脚本
# 使用环境变量中的 GitHub Token

echo "🎬 开始部署 Lens & Code 博客"
echo "=============================="
echo ""

# 从环境变量获取 token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ 错误：未找到 GITHUB_TOKEN 环境变量"
    echo ""
    echo "请先设置 token："
    echo "  export GITHUB_TOKEN='你的_token'"
    echo ""
    exit 1
fi

REPO_OWNER="tianhaishun"
REPO_NAME="lens-and-code"

echo "✓ Token 已加载"
echo "Token 前缀: ${GITHUB_TOKEN:0:15}..."
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

# 配置远程仓库（使用 token 认证）
echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null

# 使用 URL 编码的 token（处理特殊字符）
GIT_AUTH_URL="https://${REPO_OWNER}:${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git"
git remote add origin "$GIT_AUTH_URL"

echo "✓ 远程仓库已配置"
echo "仓库地址: https://github.com/${REPO_OWNER}/${REPO_NAME}.git"
echo ""

# 推送
echo "🚀 推送到 GitHub..."
git branch -M main

# 添加 -v 参数显示详细信息
git push -u origin main -v

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "📝 下一步："
    echo "1. 访问: https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/pages"
    echo "2. Source 选择: GitHub Actions"
    echo "3. 等待 3-5 分钟"
    echo "4. 访问: https://${REPO_OWNER}.github.io/${REPO_NAME}/"
    echo ""
    echo "🔍 查看部署状态: https://github.com/${REPO_OWNER}/${REPO_NAME}/actions"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "请检查："
    echo "1. 仓库是否已创建？访问: https://github.com/${REPO_OWNER}/${REPO_NAME}"
    echo "2. 仓库是否为 Public？GitHub Pages 需要 Public 仓库"
    echo "3. Token 权限是否包含 'repo'？"
    echo "4. Token 是否已过期？"
    exit 1
fi
