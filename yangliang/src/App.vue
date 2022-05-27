<template>
  <SimpleTable :columns="columns" 
               :data-source="data.dataSource"
               :current-page="currentPage"
               :page-size="pageSize"
               :total="data.total"
               :pagination-change="paginationClick" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import SimpleTable from "./components/SimpleTable";
import Mock from "mockjs"
import { addLog } from './log/log';
import { Data } from './components/types'
// import { addLog } from "./log/log";
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

function handleError (err: any) {
  addLog({ level: "error", message:{
        err
      }})    
      // 全局错误捕获时应立即将错误上传至服务器并通知相关技术人员
      // axios({
      //   url: '日志服务器',
      //   data: err
      // })
}

const generateData = (page:number, pageSize:number):Data => {
  return Mock.mock({
  'total': 66,
  [`dataSource|${pageSize}`]: [
    {
      key: '@id',
      name: '@cname',
      age: '@integer(1, 60)',
      address: '@province @city @county',
    }
  ]
})
}


const currentPage = ref(1);
const pageSize = ref(10);

const data = reactive(generateData(1, 10));


const paginationClick = (page:number) => {
  currentPage.value = Number(page);
  getData(page, 10)
}

const getData = (page:number, pageSize:number) => {
  const { total, dataSource } = generateData(page, pageSize);
  data.total = total;
  data.dataSource = dataSource;
}


onMounted(() => {
  // 监听错误日志  
  window.addEventListener('error', handleError)
  // 监听promise报错日志
  window.addEventListener('unhandledrejection', handleError)
})

onUnmounted (() => {
  window.removeEventListener('error', handleError)
  window.removeEventListener('unhandledrejection', handleError)
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
