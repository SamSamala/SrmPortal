const Redis = require('ioredis');

let redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
  console.log("Using Railway Redis");
} else {
  redis = new Redis({
    host: '127.0.0.1',
    port: 6379
  });
  console.log("Using Local Redis");
}

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err.message));

module.exports = redis;