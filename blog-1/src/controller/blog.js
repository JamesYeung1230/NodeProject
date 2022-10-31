const getList = (author, keyword) => {
    // 先返回假数据,但是数据格式是真实的
    return [
        {
            id: 1,
            title: 'title-A',
            content: 'content-A',
            createTime: '',
            author: 'zhangsan'
        },
        {
            id: 1,
            title: 'title-B',
            content: 'content-B',
            createTime: '',
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: 'title-A',
        content: 'content-A',
        createTime: '',
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: '3'
    }
}

const updateBlog = (id, blogData = {}) => {
    return true
}

const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}