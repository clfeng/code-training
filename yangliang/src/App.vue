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
  'dataSource|66': [
    {
      key: '@id',
      name: '@cname',
      age: '@integer(1, 60)',
      address: '@province @city @county',
    }
  ]
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
