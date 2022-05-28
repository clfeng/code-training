const userList = {
  url: "/user/list", // 模拟用户列表
  method: "post", // 请求方式
  timeout: 500, // 超时时间
  statusCode: 200, // 返回的http状态码
  response: { // 返回的结果集
    code: 200,
    message: "请求成功",
    'list|10': [{
      // id: '@id',
      name: '@cname',
      // email: '@email',
      // phone: /^1[385][1-9]\d{8}/,
      'sex|1': ['男', '女'],
      address: '@cparagraph',
      age: '@integer(0,100)',
      // updateTime: '@integer'
    }],
    total: 43,
    pageSize: 10,
    'current|1': [1, 2, 3, 4, 5],

  },
}
export default [
  userList
];