const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登陆
    if (method === 'POST' && res.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(loginRes => {
            if (loginRes.username) {
                return new SuccessModel(loginRes)
            }
            return new ErrorModel('Login Fail')
        })
    }
}

module.exports = handleUserRouter