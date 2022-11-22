const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// session 数据
const SESSION_DATA = {}

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('GMTString', d.toGMTString());
    return d.toGMTString()
}

// 用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach((item) => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const [key, value] = arr
        req.cookie[key.trim()] = value.trim()
    })
    console.log('req.cookie is', req.cookie);

    // 解析 session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId]= {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}`
        SESSION_DATA[userId]= {}
    }
    req.session = SESSION_DATA[userId]

    // 处理 postData
    getPostData(req).then(postData => {
        req.body = postData

        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            return blogResult.then((blogData) => {            
                if (blogData) {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }

                    res.end(JSON.stringify(blogData))
                    return
                }
            })
        }
    
        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            return userResult.then(userData => {
                if (userData) {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }

                    res.end(JSON.stringify(userData))
                    return
                }
            })
        }

        // 未命中路由,返回404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })

}

module.exports = serverHandle

// process.env.NODE_ENV