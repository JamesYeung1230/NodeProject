const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登陆
    if (method === 'POST' && res.path === '/api/user/login') {
        console.log('req.body', req.body);
        console.log(typeof req.body);
        const { username, password } = req.body
        const loginRes = login(username, password)
        if (loginRes) {
            return new SuccessModel()
        }
        return new ErrorModel('Login Fail')
    }
}

module.exports = handleUserRouter