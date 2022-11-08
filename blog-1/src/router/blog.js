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
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if (method === 'GET' && res.path === '/api/blog/detail') {

        const detailResult = getDetail(id)
        return detailResult.then(detailData => {
            return new SuccessModel(detailData)
        })
    }
    // 新建博客
    if (method === 'POST' && res.path === '/api/blog/new') {
        req.body.author = 'zhangsan' // TODO: mock data
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 更新博客
    if (method === 'POST' && res.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then((updateRes) => {            
            if (updateRes) {
                return new SuccessModel()
            }
            return new ErrorModel('Update Fail')
        })
    }
    // 删除博客
    if (method === 'POST' && res.path === '/api/blog/delete') {
        const author = 'zhangsan' // TODO: mock data
        const result = deleteBlog(id, author)
        return result.then(delRes => {
            if (delRes) {
                return new SuccessModel()
            }
            return new ErrorModel('Delete Fail')
        })
    }
}

module.exports = handleBlogRouter