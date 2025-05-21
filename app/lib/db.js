import { Redis } from "@upstash/redis";

const redisRestUrl = "https://clever-dassie-11336.upstash.io";
const redisRestToken = "ASxIAAIjcDEyMzcxNWY2MzJiMDY0MTY0OTI0MGEzY2UxNjJhNjg1MHAxMA";

if (!redisRestUrl || !redisRestToken) {
    throw new Error(
        "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be defined in the environment."
    );
}

export const db = new Redis({
    url: redisRestUrl,
    token: redisRestToken,
    cache: false,
    cacheMaxSize: 0
});
