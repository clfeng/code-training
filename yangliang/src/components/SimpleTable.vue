<template>
  <table class="table">
    <thead>
      <th v-for="item in tableProps?.columns" :key="item.dataIndex" class="th-td">
        <td>
          {{ item.title }} 
          <img v-if="item.sortOrder" src="../assets/dropup.svg" @click="onSortOrder"> 
          <img v-if="item.sortOrder" src="../assets/dropdown.svg" @click="onSortOrder"> 
        </td>
      </th>
    </thead>
    <tbody>
      <tr v-for="body in getdataSource" :key="body.key">
        <td v-for="head in tableProps?.columns" :key="head.dataIndex" class="tr-td">{{ body[head.key] }}</td>
      </tr>
    </tbody>
  </table>
  <Pagnation :total="total"
             :limit="limit"
             :page="page"
             @page-change="pageChange"
             show-quick-jumper />
</template>

<script setup lang="ts">
import { defineProps, PropType, computed, ref, watch, reactive } from 'vue';
import { TableProp,DataSource } from './types';
import Pagnation from './Pagnation.vue';
const props = defineProps({
    tableProps: Object as PropType<TableProp>
})

const limit = ref(5);

const total = props?.tableProps?.dataSource.length as number;

const page = ref(1);

const dataSource = reactive(props?.tableProps?.dataSource as DataSource[]);

const getdataSource = computed<DataSource[]>({
  get () {
    return dataSource.slice((page.value - 1) * 5, (page.value - 1) * 5 + limit.value);
  },
  set (val) {

  }
})

function pageChange (curPage:number) {  // 页码改变
  if(curPage >= 1 && curPage <= total / limit.value){
    page.value = curPage;
  }
}

function onSortOrder () { // 排序
  dataSource.reverse();
}

</script>

<style scoped>
  .table {
    width: 100%;
  }
  .th-td,.tr-td{
    border: 1px solid #ddd;
  }
 
</style>