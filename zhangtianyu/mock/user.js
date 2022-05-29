const login = {
    url: "/users/login", // 模拟登录的链接
    method: "get", // 请求方式
    timeout: 500, // 超时时间
    statusCode: 200, // 返回的http状态码
    response: { // 返回的结果集
        code: 200,
        message: "登录成功",
        'list|10': [{
            id: '@id',
            username: '@cname',
            email: '@email',
            phone: /^1[385][1-9]\d{8}/,
            role: 0,
            addr: '@cparagraph',
            createTime: '@integer',
            updateTime: '@integer'
        }]
    },
}
export default [
    login
];