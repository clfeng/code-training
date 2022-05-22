<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import SimpleTable from "./components/SimpleTable/index.tsx";
import SimpleTableColumn from "./components/SimpleTable/SimpleTableColumn.tsx";
import { PaginationProps } from "./components/Pagination/typs";
import axios from "axios";

let data = ref<unknown[]>([]);

function ajax() {
  axios("/users/login").then((res) => {
    data.value = res.data.list;
  });
}
function onClick() {
  ajax();
}
ajax();

function sortChange(sort) {
  console.log(sort, "sort");
}

function filterChange(filter) {
  console.log(filter, "filter");
}

let pageInfo = reactive<PaginationProps>({
  currentPage: 1,
  total: 100,
  pageSize: 10,
  pagerCount: 5,
});
let { currentPage, total, pageSize, pagerCount } = toRefs(pageInfo);
function currentChange(curPage: number) {
  currentPage.value = curPage;
  ajax();
}
</script>

<template>
  <simple-table
    :data="data"
    row-key="id"
    style="width: 980px"
    :order-by="['role', 'sex']"
    :default-sort="[{ prop: 'role', order: 'asc' }]"
    order-column-multiple
    @sort-change="sortChange"
    filter-column-multiple
    @filter-change="filterChange"
    :current-page="currentPage"
    :pager-count="pagerCount"
    :total="total"
    :page-size="pageSize"
    @current-change="currentChange"
  >
    <simple-table-column label="ID" prop="id" width="150">
      <template v-slot:header="{ column }">
        <div>{{ column.label }}</div>
      </template>
    </simple-table-column>
    <simple-table-column
      label="名称"
      prop="username"
      width="60"
      :filters="[
        { text: 'a', value: 1 },
        { text: 'b', value: 2 },
      ]"
    >
      <template v-slot="{ row }">
        <div>{{ row.username }}</div>
      </template>
    </simple-table-column>
    <simple-table-column label="邮箱" prop="email" />
    <simple-table-column
      label="role"
      prop="role"
      sortable
      :filters="[
        { text: 'a', value: 1 },
        { text: 'b', value: 2 },
      ]"
    />
    <simple-table-column
      label="sex"
      prop="sex"
      sortable
      :sort-orders="['normal', 'desc']"
    />
    <simple-table-column label="手机" prop="">
      <template v-slot="{ row }">
        <div>{{ row.phone }}</div>
      </template>
    </simple-table-column>
    <simple-table-column label="地址" prop="addr" width="300" />
  </simple-table>
  <button @click="onClick">刷新数据</button>
</template>

<style>
</style>
