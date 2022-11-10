const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('GMTString', d.toGMTString());
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登陆
    if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(loginRes => {
            if (loginRes.username) {

                // 操作cookie
                res.setHeader('Set-Cookie', `username=${loginRes.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

                return new SuccessModel(loginRes)
            }
            return new ErrorModel('Login Fail')
        })
    }

    // 登录验证测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel(req.cookie.username))
        }
        return Promise.resolve(new ErrorModel('Login Fail'))
    }
}

module.exports = handleUserRouter