# 趣味背古诗 - 更新日志

## 📅 最新更新：2026-03-02

---

## ✅ 1. 初始版本 + Docker 支持

### 新增功能
- **趣味背古诗** 初始版本发布
- **Docker 容器化部署** 支持

### 新增文件
- **VERSION** - 版本号管理文件（当前版本: 1.0.0）
- **CHANGELOG.md** - 项目更新日志
- **Dockerfile** - Docker 镜像构建文件
- **.dockerignore** - Docker 构建排除文件
- **scripts/docker/build.sh** - Docker 镜像本地构建脚本
- **scripts/docker/start.sh** - Docker 容器启动脚本
- **scripts/docker/stop.sh** - Docker 容器停止脚本
- **scripts/docker/logs.sh** - Docker 容器日志查看脚本
- **scripts/docker/README.md** - 脚本使用说明

### 镜像信息
- **镜像名**: `xbingo/ancient-poems`（建议）
- **版本**: `1.0.0`
- **容器名**: `ancient-poems`
- **端口**: `2027`
- **基础镜像**: `nginx:alpine`

### 使用方式
```bash
# 本地构建镜像
./scripts/docker/build.sh

# 启动容器
./scripts/docker/start.sh

# 查看日志
./scripts/docker/logs.sh -f

# 停止容器
./scripts/docker/stop.sh
```

### 技术栈
- React + TypeScript + Vite
- Tailwind CSS
- Nginx（静态文件服务）

---

## 📝 说明

项目已配置 Docker 支持，可在本地快速构建和运行。
