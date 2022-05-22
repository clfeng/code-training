组件使用的demo

``` html
<template>
  <SimpleTable :columns="columns" :data-source="mock.dataSource" />
</template>

<script setup lang="ts">
import SimpleTable from "./components/SimpleTable";
import Mock from "mockjs"
const columns = [
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


const mock = Mock.mock({
  'dataSource|30': [
    {
      key: '@id',
      name: '@cname',
      age: '@integer(1, 60)',
      address: '@province @city @county',
    }
  ]
})
</script>

```


Table Api

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| bodyCell | 个性化单元格 | v-slot:bodyCell="{text, record, index, column}" | - |
| bordered | 是否展示外边框和列边框 | boolean | false |
| columns | 表格列的配置 | Column[] | [] |
| pagination | 分页配置 | Pagination | false | false|
| dataSource | 数据源的数组 | Array | - |


Column api

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| align | 表格列对齐方式 | 'left'/'center'/'right' | 'left' |
| ellipsis | 超过列宽自动省略 | boolean/{showTip:boolean} | false |
| defaultSortOrder | 默认排序 | 'ascend'/'descend' | - |
| dataKey | 与dataSource对应的key对应 | string | - |
| fixed | 列是否固定 | boolean/true==='left'/'right' | false |
| sortOrder | 排序的受控属性，外界可用此控制列的排序 | 'ascend'/'descend'/false | false |
| sorter | 自定义排序 | { compare:() => {}, priority: number }/compare是数据数组sort函数执行时传入的执行函数，多列排序时priority字段决定优先级 | - |
| resizable | 列可拖拽拉伸收缩 | boolean | false |
| title | 列头显示的文字 | string | '' |
| maxWidth | 列拖拽时可被拉伸的最大宽度 | number | - |
| minWidth | 列拖拽时可被收缩的最小宽度 | number | 30 |
| width | 列宽度 | string/number 如:'1px/100%'/30 | - |
| title | 表头展示文字 | string |  |
| key | key | string |  |



Pagination

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| current | 当前页 | v-model/number | - |
| disabled | 禁用分页 | boolean | false |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |
| defaultPageSize | 默认每页条数 | number | 10 |
| pageSize | 每页条数 | number | - |
| showTotal | 用于显示数据总量和当前数据顺序 | (total,range:[])=>{} | - |
| total | 数据总数 | number | - |
| pageSizeOptions | 每页pageSize的配置项 | number[] | - |
| showSizeChanger | 是否可改变pageSize | boolean | true |
| showSizeChange | pageSize 变化的回调 | (pageSize)=>{} | - |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| change | 页码改变的回调 | (current, pageSize)=>{} | - |
| showPre| 是否展示上一步 | boolean | true |
| showNext| 是否展示下一步 | boolean | true |
| v-slot='pre'| 上一步插槽 | dom元素 | - |
| v-slot='next'| 下一步插槽 | dom元素 | - |


Pager

| 参数 | 说明 | 类型 | 默认值 |
| ------  | ------ | ------ | ------ |
| page    | 页码    | Number | - |
| active  | 当前选中Paeger  | boolean | false |
| onClick | 点击Pager的函数 | boolean | false | 