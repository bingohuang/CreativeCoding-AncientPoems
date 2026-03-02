# 趣味背古诗 - 更新日志

## 📅 最新更新：2026-03-02

---

## ✅ 3. 添加中文使用说明文档

### 新增文件
- **使用说明.txt** - 详细的中文使用说明文档

### 文档内容
- 作品简介（翠苑第一小学教育集团参赛作品说明）
- 系统要求和环境配置
- 快速开始指南（Docker 和本地两种方式）
- 项目文件结构说明
- Docker 脚本使用指南
- 技术栈说明
- 常见问题解答
- 版本信息和联系方式

### 适用对象
- 参赛评审老师
- 学校信息技术老师
- 普通用户

---

## ✅ 2. Docker 多平台支持 (arm64 + amd64)

### 新增功能
- **多架构支持**: 同时支持 `linux/amd64` (x86_64) 和 `linux/arm64` (ARM64/Apple Silicon)
- **build-multiarch.sh**: 新增多平台镜像构建脚本
- **push.sh**: 新增镜像推送脚本

### 镜像架构
| 架构 | 说明 | 适用平台 |
|-----|------|---------|
| `linux/amd64` | x86_64 | Intel/AMD 处理器 |
| `linux/arm64` | ARM64 | Apple Silicon (M1/M2/M3), ARM 服务器 |

### 使用方式
```bash
# 构建多平台镜像（本地 + 推送）
./scripts/docker/build-multiarch.sh

# 或分开执行
./scripts/docker/build-multiarch.sh --load    # 仅本地构建
./scripts/docker/push.sh                       # 手动推送
```

### 技术细节
- 使用 `docker buildx` 实现跨平台构建
- 使用 Docker manifest 实现多架构支持
- Docker 会根据宿主机架构自动选择合适的镜像

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
