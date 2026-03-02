# Docker 部署脚本

本目录包含趣味背古诗的 Docker 部署脚本。

## 文件说明

| 脚本 | 功能 | 用法 |
|-----|------|------|
| `build-multiarch.sh` | 多平台镜像构建（arm64 + amd64） | `./build-multiarch.sh [--load\|--push]` |
| `push.sh` | 推送镜像到 Docker Hub | `./push.sh` |
| `build.sh` | 单平台本地构建 | `./build.sh` |
| `start.sh` | 启动 Docker 容器 | `./start.sh` |
| `stop.sh` | 停止 Docker 容器 | `./stop.sh` |
| `logs.sh` | 查看容器日志 | `./logs.sh [选项]` |

## 多平台支持

镜像同时支持以下架构：

| 架构 | 说明 | 适用平台 |
|-----|------|---------|
| `linux/amd64` | x86_64 | Intel/AMD 处理器 |
| `linux/arm64` | ARM64 | Apple Silicon (M1/M2/M3), ARM 服务器 |

## 快速开始

### 1. 多平台构建并推送（推荐）

```bash
# 构建多平台镜像并推送到 Docker Hub
./scripts/docker/build-multiarch.sh --push
```

### 2. 分开执行：构建 → 推送

```bash
# 步骤1：构建多平台镜像（本地）
./scripts/docker/build-multiarch.sh --load

# 步骤2：推送镜像（由用户执行）
./scripts/docker/push.sh
```

### 3. 从 Docker Hub 拉取并运行

```bash
# 拉取镜像（自动选择当前架构）
docker pull xbingo/ancient-poems:1.0.1

# 启动容器
./scripts/docker/start.sh
```

容器启动后，访问 http://localhost:2027

## 脚本详细说明

### build-multiarch.sh

```bash
# 仅本地构建（默认）
./scripts/docker/build-multiarch.sh
./scripts/docker/build-multiarch.sh --load

# 构建并推送到 Docker Hub
./scripts/docker/build-multiarch.sh --push

# 查看帮助
./scripts/docker/build-multiarch.sh --help
```

### push.sh

```bash
# 推送本地镜像到 Docker Hub
./scripts/docker/push.sh
```

推送前会自动检查：
- 本地镜像是否存在
- Docker Hub 登录状态

### logs.sh

```bash
# 显示最后 100 行日志
./scripts/docker/logs.sh

# 实时跟踪日志
./scripts/docker/logs.sh -f

# 显示最后 50 行日志
./scripts/docker/logs.sh -n 50
```

## 镜像信息

- **镜像名**: `xbingo/ancient-poems`
- **版本**: 从 `VERSION` 文件读取
- **容器名**: `ancient-poems`
- **端口**: `2027:2027`

## 版本管理

项目版本号存储在项目根目录的 `VERSION` 文件中，格式为 `x.x.x`。

修改 VERSION 文件后，重新执行构建脚本即可生成新版本的镜像。

## 注意事项

1. **多平台构建需要 Docker Desktop 或启用 buildx 插件**
2. **推送镜像前需要先登录 Docker Hub**: `docker login`
3. **首次构建可能需要下载基础镜像**，请确保网络连接正常
