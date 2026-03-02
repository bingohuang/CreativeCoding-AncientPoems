#!/bin/bash

# 趣味背古诗 - Docker 多平台镜像构建脚本
# 支持架构: linux/amd64 (x86_64), linux/arm64 (ARM64)
# 使用方法: ./build-multiarch.sh [--load|--push]

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

# 支持的架构
PLATFORMS="linux/amd64,linux/arm64"

# 解析参数
MODE="load"  # 默认仅加载到本地
while [[ $# -gt 0 ]]; do
    case $1 in
        --load)
            MODE="load"
            shift
            ;;
        --push)
            MODE="push"
            shift
            ;;
        -h|--help)
            echo "用法: $0 [选项]"
            echo ""
            echo "选项:"
            echo "  --load     仅构建并加载到本地（默认）"
            echo "  --push     构建并推送到 Docker Hub"
            echo "  -h, --help 显示帮助信息"
            echo ""
            echo "示例:"
            echo "  $0              # 仅本地构建"
            echo "  $0 --push       # 构建并推送"
            exit 0
            ;;
        *)
            echo "未知选项: $1"
            echo "使用 -h 或 --help 查看帮助"
            exit 1
            ;;
    esac
done

echo "=========================================="
echo "🐳 Docker 多平台镜像构建"
echo "=========================================="
echo "📦 项目: 趣味背古诗"
echo "🏷️  版本: ${VERSION}"
echo "🖥️  架构: ${PLATFORMS}"
echo "🖼️  镜像: ${FULL_IMAGE_NAME}"
echo "📤 模式: ${MODE}"
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

# 检查 docker buildx 是否可用
if ! docker buildx version > /dev/null 2>&1; then
    echo "❌ 错误：docker buildx 不可用，请安装 Docker Desktop 或启用 buildx 插件"
    exit 1
fi

# 检查/创建 buildx builder
BUILDER_NAME="ancient-poems-builder"
if ! docker buildx ls | grep -q "${BUILDER_NAME}"; then
    echo ""
    echo "🔧 创建 buildx builder: ${BUILDER_NAME}"
    docker buildx create --name "${BUILDER_NAME}" --driver docker-container --bootstrap
fi

# 使用指定的 builder
docker buildx use "${BUILDER_NAME}"

# 构建多平台镜像
if [ "$MODE" = "push" ]; then
    echo ""
    echo "🔨 构建并推送多平台镜像到 Docker Hub..."
    echo "   平台: ${PLATFORMS}"
    echo "   镜像: ${FULL_IMAGE_NAME}"
    echo "   镜像: ${LATEST_IMAGE_NAME}"
    echo ""
    
    cd "${PROJECT_ROOT}"
    docker buildx build \
        --platform "${PLATFORMS}" \
        --tag "${FULL_IMAGE_NAME}" \
        --tag "${LATEST_IMAGE_NAME}" \
        --push \
        .
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 多平台镜像构建并推送成功！"
        echo ""
        echo "📋 Docker Hub 地址:"
        echo "   https://hub.docker.com/r/${IMAGE_NAME}"
        echo ""
        echo "🖥️  支持的架构:"
        echo "   - linux/amd64 (x86_64)"
        echo "   - linux/arm64 (ARM64/Apple Silicon)"
        echo ""
        echo "🚀 拉取镜像:"
        echo "   docker pull ${FULL_IMAGE_NAME}"
        echo "   docker pull ${LATEST_IMAGE_NAME}"
    else
        echo ""
        echo "❌ 镜像构建或推送失败"
        exit 1
    fi
else
    echo ""
    echo "🔨 构建多平台镜像到本地..."
    echo "   平台: ${PLATFORMS}"
    echo "   镜像: ${FULL_IMAGE_NAME}"
    echo ""
    echo "⚠️  注意：--load 模式只能加载当前平台的镜像到本地"
    echo "   要推送多平台镜像，请使用: $0 --push"
    echo ""
    
    cd "${PROJECT_ROOT}"
    docker buildx build \
        --platform "${PLATFORMS}" \
        --tag "${FULL_IMAGE_NAME}" \
        --tag "${LATEST_IMAGE_NAME}" \
        --load \
        .
    
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
        echo "   ./scripts/docker/push.sh"
    else
        echo ""
        echo "❌ 镜像构建失败"
        exit 1
    fi
fi
