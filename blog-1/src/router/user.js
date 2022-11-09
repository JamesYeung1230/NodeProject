const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

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
                res.setHeader('Set-Cookie', `username=${loginRes.username}`)

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