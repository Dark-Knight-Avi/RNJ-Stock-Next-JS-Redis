
const redisRestUrl = "https://clever-dassie-11336.upstash.io";
const redisRestToken = "ASxIAAIjcDEyMzcxNWY2MzJiMDY0MTY0OTI0MGEzY2UxNjJhNjg1MHAxMA";

export const fetchredis = async (command, ...args) => {
  const url = `${redisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${redisRestToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }
  const data = await response.json();
  return JSON.parse(data.result);
};
