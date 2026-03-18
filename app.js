const http = require("http");
const redis = require("redis");

const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || "redis";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const APP_NAME = process.env.APP_NAME || "unknown-app";

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

async function connectWithRetry() {
  while (true) {
    try {
      await client.connect();
      console.log("Connected to Redis");
      break;
    } catch (err) {
      console.log("Retrying Redis connection...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

async function start() {
  await connectWithRetry();

  const server = http.createServer(async (req, res) => {
    let visits = await client.get("visits");
    visits = visits ? parseInt(visits) + 1 : 1;
    await client.set("visits", visits);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h1>Docker Compose Load Balancing Demo</h1>
      <p>Handled by: ${APP_NAME}</p>
      <p>Visits: ${visits}</p>
      <p>Redis Host: ${REDIS_HOST}</p>
      <p>Redis Port: ${REDIS_PORT}</p>
    `);
  });

  server.listen(PORT, () => {
    console.log(`${APP_NAME} running on port ${PORT}`);
  });
}

start();