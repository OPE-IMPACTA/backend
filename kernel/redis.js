const IORedis = require('ioredis');

class Redis {
    constructor(keyPrefix) {
        this.redis = new IORedis({
            host: process.env.REDIS_HOST || "redis",
            port: process.env.REDIS_PORT || 6379,
            keyPrefix: keyPrefix
        });
    }

    async exists(key) {
        return await this.redis.exists(key);
    }

    async get(key) {
        const value = await this.redis.get(key);

        return value ? JSON.parse(value) : null;
    }

    set(key, value, timeExp) {
        return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
    }

    hset(key, field, value) {
        return this.redis.hset(key, field, JSON.stringify(value));
    }

    async hget(key, field) {
        const value = await this.redis.hget(key, field);

        return value ? JSON.parse(value) : null;
    }

    async hgetall(key) {
        const value = await this.redis.hgetall(key);
        const values = {};

        if (value) {
            for (const id in value) {
                values[id] = JSON.parse(value[id])
            }
        }

        return values;
    }

    del(key) {
        return this.redis.del(key);
    }

    async delPrefix(prefix) {
        const keys = (await this.redis.keys(`${prefix}:*`)).map((key) =>
            key.replace(prefix, "")
        );

        return this.redis.del(keys);
    }
}

module.exports = Redis;
