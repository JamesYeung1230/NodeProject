const http = require('http');
// const URLSearchParams = require('url').URLSearchParams;
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const methods = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    // 设置返回格式为JSON
    res.setHeader('Content-type', 'application/json')

    const resData = {
        methods,
        url,
        path,
        query
    }

    if (methods === 'GET') {
        res.end(JSON.stringify(resData))
    }
    if (methods === 'POST') {
        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end(JSON.stringify(resData))
        })
    }
})

server.listen(8080)
console.log('nodejs is listening 8080');