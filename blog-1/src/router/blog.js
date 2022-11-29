const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("Login Fail"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id || "";

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckRes = loginCheck(req);
      if (loginCheckRes) {
        // 未登录
        return loginCheckRes;
      }
      // 强制查询自己的blog
      author = req.session.username;
    }
    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const detailResult = getDetail(id);
    return detailResult.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }
  // 新建博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckRes = loginCheck(req);
    if (loginCheckRes) {
      // 未登录
      return loginCheckRes;
    }
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }
  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckRes = loginCheck(req);
    if (loginCheckRes) {
      // 未登录
      return loginCheckRes;
    }
    const result = updateBlog(id, req.body);
    return result.then((updateRes) => {
      if (updateRes) {
        return new SuccessModel();
      }
      return new ErrorModel("Update Fail");
    });
  }
  // 删除博客
  if (method === "POST" && req.path === "/api/blog/delete") {
    const loginCheckRes = loginCheck(req);
    if (loginCheckRes) {
      // 未登录
      return loginCheckRes;
    }
    const author = req.session.username;
    const result = deleteBlog(id, author);
    return result.then((delRes) => {
      if (delRes) {
        return new SuccessModel();
      }
      return new ErrorModel("Delete Fail");
    });
  }
};

module.exports = handleBlogRouter;
