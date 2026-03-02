# Docker 部署脚本

本目录包含趣味背古诗的 Docker 部署脚本。

## 文件说明

| 脚本 | 功能 | 用法 |
|-----|------|------|
| `build.sh` | 本地构建 Docker 镜像 | `./build.sh` |
| `start.sh` | 启动 Docker 容器 | `./start.sh` |
| `stop.sh` | 停止 Docker 容器 | `./stop.sh` |
| `logs.sh` | 查看容器日志 | `./logs.sh [选项]` |

## 快速开始

### 1. 构建镜像

```bash
./scripts/docker/build.sh
```

### 2. 启动容器

```bash
./scripts/docker/start.sh
```

容器启动后，访问 http://localhost:2027

### 3. 查看日志

```bash
# 显示最后 100 行日志
./scripts/docker/logs.sh

# 实时跟踪日志
./scripts/docker/logs.sh -f

# 显示最后 50 行日志
./scripts/docker/logs.sh -n 50
```

### 4. 停止容器

```bash
./scripts/docker/stop.sh
```

## 镜像信息

- **镜像名**: `xbingo/ancient-poems`
- **版本**: 从 `VERSION` 文件读取
- **容器名**: `ancient-poems`
- **端口**: `2027:2027`

## 手动推送到 Docker Hub

```bash
# 登录 Docker Hub
docker login

# 推送镜像
docker push xbingo/ancient-poems:1.0.0
docker push xbingo/ancient-poems:latest
```

## 版本管理

项目版本号存储在项目根目录的 `VERSION` 文件中，格式为 `x.x.x`。

修改 VERSION 文件后，重新执行构建脚本即可生成新版本的镜像。
