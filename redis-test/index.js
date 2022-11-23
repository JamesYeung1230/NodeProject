const redis = require('redis');

// redis 4X
(async function () {
    
    // 创建 redis 客户端
    const redisClient = redis.createClient(6379, '127.0.0.1')

    // 链接
    await redisClient.connect()
    .then(() => console.log('redis connect success!'))
    .catch((err) => console.log(err))
    
    // 测试
    await redisClient.set('myname', 'zhangsan3')

    const myname = await redisClient.get('myname')
    console.log('myname', myname);

    // 退出
    redisClient.quit()
})()


