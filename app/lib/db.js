import { Redis } from "@upstash/redis";

const redisRestUrl = "https://clear-zebra-43267.upstash.io";
const redisRestToken = "AakDACQgNTU5YjhlOTEtMDlkYy00NWIzLWJjNmItZjVjMGIxOTk4ZTZjMzhjM2FmOTI4YjQ4NDcwMWJlOWU1YTBmZDkzNGFmZDE=";

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
