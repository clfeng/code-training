<script setup lang="ts">
import { ref, reactive, toRefs } from "vue-demi";
import SimpleTable from "./components/SimpleTable/index.vue";
import SimpleTableColumn from "./components/SimpleTable/SimpleTableColumn/index.vue";
import Pagination from "./components/Pagination/index.vue";
import { PaginationProps } from "./components/Pagination/typs";
import { SortInfo } from "./components/SimpleTable/type";
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

function sortChange(sort: SortInfo) {
  console.log(sort, "sort");
}

let pageInfo = reactive<PaginationProps>({
  currentPage: 1,
  pageCount: 11,
  pagerCount: 9,
});
let { currentPage, pageCount, pagerCount } = toRefs(pageInfo);
function currentChange(curPage: number) {
  currentPage.value = curPage;
  ajax();
}
</script>

<template>
  <simple-table :data="data" style="width: 980px" @sort-change="sortChange">
    <simple-table-column label="ID" prop="id" width="150" sortable="custom" />
    <simple-table-column label="名称" prop="username" width="60">
      <template v-slot="{ row }">
        <div>{{ row.username }}</div>
      </template>
    </simple-table-column>
    <simple-table-column label="邮箱" prop="email" />
    <simple-table-column label="手机" prop="phone" sortable>
      <template v-slot="{ row }">
        <div>{{ row.phone }}</div>
      </template>
    </simple-table-column>
    <simple-table-column label="地址" prop="addr" width="300" />
  </simple-table>
  <pagination
    @current-change="currentChange"
    :current-page="currentPage"
    :pager-Count="pagerCount"
    :page-count="pageCount"
  />
  <button @click="onClick">111</button>
</template>

<style>
</style>
