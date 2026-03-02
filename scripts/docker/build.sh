#!/bin/bash

# 趣味背古诗 - Docker 镜像本地构建脚本
# 镜像名: xbingo/ancient-poems

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
echo "🐳 Docker 镜像本地构建"
echo "=========================================="
echo "📦 项目: 趣味背古诗"
echo "🏷️  版本: ${VERSION}"
echo "🖼️  镜像: ${FULL_IMAGE_NAME}"
echo "=========================================="

# 检查 dist 目录是否存在
if [ ! -d "${PROJECT_ROOT}/dist" ]; then
    echo "⚠️  dist 目录不存在，先执行构建..."
    cd "${PROJECT_ROOT}"
    npm install
    npm run build
fi

# 检查 dist/index.html 是否存在
if [ ! -f "${PROJECT_ROOT}/dist/index.html" ]; then
    echo "❌ 错误：dist/index.html 不存在，请确保前端构建成功"
    exit 1
fi

# 构建镜像
echo ""
echo "🔨 开始构建 Docker 镜像..."
cd "${PROJECT_ROOT}"
docker build -t "${FULL_IMAGE_NAME}" -t "${LATEST_IMAGE_NAME}" .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 镜像构建成功！"
    echo ""
    echo "📋 镜像信息:"
    docker images | grep "${IMAGE_NAME}" | grep -E "${VERSION}|latest" || true
    echo ""
    echo "🚀 启动容器:"
    echo "   ./scripts/docker/start.sh"
    echo ""
    echo "📤 推送到 Docker Hub:"
    echo "   docker push ${FULL_IMAGE_NAME}"
    echo "   docker push ${LATEST_IMAGE_NAME}"
else
    echo ""
    echo "❌ 镜像构建失败"
    exit 1
fi
