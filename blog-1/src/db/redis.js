const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");
// redis 4X

// 创建 redis 客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

!(async function () {
  // 链接
  await redisClient
    .connect()
    .then(() => console.log("redis connect success!"))
    .catch((err) => console.log(err));

  // 退出
  //   redisClient.quit();
})();

async function set(key, val) {
  let objVal;
  if (typeof val === "object") {
    objVal = JSON.stringify(val);
  } else {
    objVal = val;
  }
  return await redisClient.set(key, objVal, redis.print);
}

async function get(key) {
  try {
    let val = await redisClient.get(key);
    if (val == null) return null;
    try {
      val = JSON.parse(val);
    } catch (err) {}
    return val;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  set,
  get,
};
