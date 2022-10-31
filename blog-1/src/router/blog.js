const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id || ''

    // 获取博客列表
    if (method === 'GET' && res.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    // 获取博客详情
    if (method === 'GET' && res.path === '/api/blog/detail') {
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }
    // 新建博客
    if (method === 'POST' && res.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    // 更新博客
    if (method === 'POST' && res.path === '/api/blog/update') {
        const updateRes = updateBlog(id, req.body)
        if (updateRes) {
            return new SuccessModel()
        }
        return new ErrorModel('Update Fail')
    }
    // 删除博客
    if (method === 'POST' && res.path === '/api/blog/delete') {
        const delRes = deleteBlog(id)
        if (delRes) {
            return new SuccessModel()
        }
        return new ErrorModel('Delete Fail')
    }
}

module.exports = handleBlogRouter