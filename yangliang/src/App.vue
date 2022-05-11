<template>
  <SimpleTable :tableProps="tableProps" />
</template>

<script setup lang="ts">
import  SimpleTable from "./components/SimpleTable.vue";
import  { reactive  }  from  'vue' ;

const dataSource = [];

for(let i = 0; i < 20; i++){
  dataSource.push({
      key: i,
      name: `胡彦斌${i}`,
      age: i,
      address: `西湖区湖底公园${i}号`,
    })
}

const tableProps = reactive({
  dataSource,
  columns: [
     {
       title: '姓名',
       dataIndex: 'name',
       key: 'name',
       sortOrder: true
     },
     {
       title: '年龄',
       dataIndex: 'age',
       key: 'age',
     },
     {
       title: '住址',
       dataIndex: 'address',
       key: 'address',
     },
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
