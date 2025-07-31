#!/bin/bash
set -e

TAG=06a7d98554a27a48e9c12a050a812a9b6edf7e6e
ACR_REGISTRY=crpi-b2oonawkgqs9orcs.cn-beijing.personal.cr.aliyuncs.com
ACR_NAMESPACE=cjy-test

# 检查必要参数
if [ -z "$TAG" ] || [ -z "$ACR_REGISTRY" ] || [ -z "$ACR_NAMESPACE" ]; then
  echo "错误：缺少必要参数！"
  echo "用法: $0 <TAG> <ACR_REGISTRY> <ACR_NAMESPACE>"
  exit 1
fi

# 拉取新镜像
docker pull ${ACR_REGISTRY}/${ACR_NAMESPACE}/cjyportfolio:${TAG}

# 使用环境变量部署
export TAG=${TAG}
export ACR_REGISTRY=${ACR_REGISTRY}
export ACR_NAMESPACE=${ACR_NAMESPACE}

docker compose -f /app/deploy/cjyportfolio/deploy/docker-compose.yml up -d --force-recreate

# 清理旧镜像（保留最近的3个版本）
echo "=== 清理旧镜像 ==="
docker images --filter=reference="${ACR_REGISTRY}/${ACR_NAMESPACE}/cjyportfolio:*" --format "{{.ID}}" | tail -n +3 | xargs -r docker rmi -f || true


echo "✅ 测试部署完成！"