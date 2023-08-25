
const redisRestUrl = "https://clear-zebra-43267.upstash.io";
const redisRestToken = "AakDACQgNTU5YjhlOTEtMDlkYy00NWIzLWJjNmItZjVjMGIxOTk4ZTZjMzhjM2FmOTI4YjQ4NDcwMWJlOWU1YTBmZDkzNGFmZDE=";

export const fetchredis = async (command, ...args) => {
  const commandUrl = `${redisRestUrl}/${command}/${args.join("/")}`;
  const response = await fetch(commandUrl, {
    headers: { Authorization: `Bearer ${redisRestToken}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.result);
};
