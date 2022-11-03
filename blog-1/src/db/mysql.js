const mysql = requrie('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行sql语句的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
                return
            }
            console.log(result);
            resolve(result)
        })
    })
    return promise
}

// 类似单例模式,无需关闭
// 关闭链接
// con.end()

module.exports = {
    exec
}