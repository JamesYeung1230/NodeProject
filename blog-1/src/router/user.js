const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登陆
  if (method === "GET" && req.path === "/api/user/login") {
    // const { username, password } = req.body
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((loginRes) => {
      if (loginRes.username) {
        // 设置session
        req.session.username = loginRes.username;
        req.session.realname = loginRes.realname;
        // 同步 redis
        set(req.sessionId, req.session);

        return new SuccessModel(loginRes);
      }
      return new ErrorModel("Login Fail");
    });
  }

  // 登录验证测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel(req.session));
    }
    return Promise.resolve(new ErrorModel("Login Fail"));
  }
};

module.exports = handleUserRouter;
