#!/bin/bash

# Lens & Code 博客自动部署脚本
# 使用 GitHub Personal Access Token 进行认证

echo "🎬 Lens & Code 博客自动部署"
echo "============================"
echo ""

# 配置
REPO_OWNER="tianhaishun"
REPO_NAME="lens-and-code"
GITHUB_TOKEN=""

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误：请在 cinematic-blog 项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查 token 是否设置
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  需要设置 GitHub Personal Access Token${NC}"
    echo ""
    echo "请按以下步骤创建 Token："
    echo "1. 访问: https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token (classic)'"
    echo "3. 勾选权限:"
    echo "   - repo (Full control of private repositories)"
    echo "   - workflow (GitHub Actions workflows)"
    echo "4. 点击 'Generate token'"
    echo "5. 复制生成的 token（只显示一次！）"
    echo ""
    echo "然后运行以下命令设置环境变量："
    echo -e "${GREEN}export GITHUB_TOKEN='你的token'${NC}"
    echo ""
    echo "或者直接运行（会提示输入）："
    echo -e "${GREEN}GITHUB_TOKEN='你的token' ./deploy-with-token.sh${NC}"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Token 已设置${NC}"
echo ""

# 检查 git 是否初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Lens & Code blog"
    echo -e "${GREEN}✓ Git 仓库已初始化${NC}"
fi

# 配置远程仓库
echo ""
echo "🔗 配置远程仓库..."
if git remote get-url origin > /dev/null 2>&1; then
    git remote remove origin
fi

# 使用 token 的 URL
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git"
git remote add origin $REMOTE_URL
echo -e "${GREEN}✓ 远程仓库已配置${NC}"

# 推送到 GitHub
echo ""
echo "🚀 推送代码到 GitHub..."
git branch -M main

if git push -u origin main; then
    echo -e "${GREEN}✓ 代码推送成功！${NC}"
    echo ""
    echo "📝 下一步："
    echo "1. 访问: https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/pages"
    echo "2. Source 选择: GitHub Actions"
    echo "3. 等待 3-5 分钟后访问: https://${REPO_OWNER}.github.io/${REPO_NAME}/"
    echo ""
else
    echo -e "${RED}❌ 推送失败，请检查:${NC}"
    echo "  - Token 是否正确"
    echo "  - 仓库名是否正确"
    echo "  - 网络连接"
    exit 1
fi
