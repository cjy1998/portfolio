/**
 * 轻量内存级速率限制（适合单实例部署）
 * 多实例部署需替换为 Redis 版本
 */

interface RateBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateBucket>();

// 每分钟最大请求数
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_MINUTE = 10;

// 定期清理过期 bucket，避免内存泄漏
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * 检查是否允许请求
 * @returns true 允许；false 已超限
 */
export function rateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  // 窗口已过期或不存在，新建
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  bucket.count++;
  return bucket.count <= MAX_REQUESTS_PER_MINUTE;
}

export function getRemainingRequests(key: string): number {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < Date.now()) return MAX_REQUESTS_PER_MINUTE;
  return Math.max(0, MAX_REQUESTS_PER_MINUTE - bucket.count);
}
