<template>
  <SimpleTable :columns="columns" 
               :data-source="getDataSource"
               :current-page="currentPage"
               :page-size="pageSize"
               :total="mock.dataSource.length"
               :pagination-change="paginationClick" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SimpleTable from "./components/SimpleTable";
import Mock from "mockjs"
import { addLog } from './log/log';
import { computed } from '@vue/reactivity';
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


// 当前使用假数据，如需要远程分页的话，在每次分页函数执行时调用后端接口，更新传入组件的dataSource
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

const currentPage = ref(1);
const pageSize = ref(10);

const getDataSource = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value, 
        end = currentPage.value * pageSize.value;
  return mock.dataSource.slice(start, end);
});

const paginationClick = (page:number) => {
   currentPage.value = page;
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
