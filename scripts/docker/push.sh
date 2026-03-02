#!/bin/bash

# 趣味背古诗 - Docker 镜像推送脚本
# 推送到 Docker Hub

set -e

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# 读取版本号
VERSION_FILE="${PROJECT_ROOT}/VERSION"
if [ -f "$VERSION_FILE" ]; then
    VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
else
    echo "❌ 错误：找不到 VERSION 文件"
    exit 1
fi

# 镜像信息
IMAGE_NAME="xbingo/ancient-poems"
FULL_IMAGE_NAME="${IMAGE_NAME}:${VERSION}"
LATEST_IMAGE_NAME="${IMAGE_NAME}:latest"

echo "=========================================="
echo "🐳 Docker 镜像推送"
echo "=========================================="
echo "📦 项目: 趣味背古诗"
echo "🏷️  版本: ${VERSION}"
echo "🖼️  镜像: ${FULL_IMAGE_NAME}"
echo "=========================================="

# 检查本地镜像是否存在
echo ""
echo "🔍 检查本地镜像..."
if ! docker images | grep -q "${IMAGE_NAME}.*${VERSION}"; then
    echo "❌ 错误：本地镜像 ${FULL_IMAGE_NAME} 不存在"
    echo "请先构建镜像:"
    echo "   ./scripts/docker/build-multiarch.sh"
    exit 1
fi

echo "✅ 本地镜像存在"
echo ""
echo "📋 本地镜像信息:"
docker images | grep "${IMAGE_NAME}" | grep -E "${VERSION}|latest" || true

# 检查是否已登录 Docker Hub
# echo ""
# echo "🔑 检查 Docker Hub 登录状态..."
# DOCKER_USER=$(docker info 2>/dev/null | grep -i "username" | awk '{print $2}')
# if [ -z "$DOCKER_USER" ]; then
#     echo "⚠️  未检测到 Docker Hub 登录状态"
#     echo ""
#     echo "请先登录 Docker Hub:"
#     echo "   docker login"
#     exit 1
# fi
# echo "✅ 已登录 Docker Hub (用户: ${DOCKER_USER})"

# 提示用户确认
echo ""
echo "⚠️  将要推送以下镜像到 Docker Hub:"
echo "   - ${FULL_IMAGE_NAME}"
echo "   - ${LATEST_IMAGE_NAME}"
echo ""

# 检查是否是交互式终端
if [ -t 0 ]; then
    read -p "确认推送? (y/n): " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        echo "❌ 取消推送"
        exit 0
    fi
else
    echo "ℹ️  非交互式终端，自动继续推送..."
fi

# 推送镜像
echo ""
echo "📤 推送镜像到 Docker Hub..."

echo ""
echo "   推送: ${FULL_IMAGE_NAME}"
docker push "${FULL_IMAGE_NAME}"

echo ""
echo "   推送: ${LATEST_IMAGE_NAME}"
docker push "${LATEST_IMAGE_NAME}"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 镜像推送成功！"
    echo ""
    echo "📋 Docker Hub 地址:"
    echo "   https://hub.docker.com/r/${IMAGE_NAME}"
    echo ""
    echo "🚀 拉取镜像:"
    echo "   docker pull ${FULL_IMAGE_NAME}"
    echo "   docker pull ${LATEST_IMAGE_NAME}"
else
    echo ""
    echo "❌ 镜像推送失败"
    exit 1
fi
