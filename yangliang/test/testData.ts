import Mock from "mockjs";

export const columns = [
    {
      title: '姓名',
      dataKey: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataKey: 'age',
      key: 'age',
      sorter: true
    },
    {
      title: '住址',
      dataKey: 'address',
      key: 'address',
    },
]

export const mock = Mock.mock({
    'dataSource|10':[
        {
            key: '@id',
            name: '@cname',
            age: '@integer(1, 60)',
            address: '@province @city @county',
        }
    ]
})
