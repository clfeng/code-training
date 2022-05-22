<script setup lang="ts">
//多写了一个分页props类型，使用defineProps定义类型时，类型必需写在当前页面，导入的类型会报错
interface PaginationProps {
  total?: number;
  pageSize?: number;
  currentPage?: number;
  pagerCount?: number;
}
//hook
import usePage from "./hook/usePage";
import usePageListener from "./hook/usePageListener";
//常量
import { paginationListener } from "./const";

const emit = defineEmits(paginationListener);

const props = withDefaults(defineProps<PaginationProps>(), {
  total: 10,
  pageSize: 10,
  currentPage: 1,
  pagerCount: 7,
});

//处理需要显示的分页按钮
let { pageCount, pagers, currentPage } = usePage(props);

//处理分页接收的事件
let { changeCurrentPage, nextPage, prePage } = usePageListener(
  currentPage,
  pageCount,
  emit
);
</script>

<template>
  <section class="pagination__warp">
    <button class="pagination__pre" @click="prePage">上一页</button>
    <ul class="pagination__pager">
      <li
        v-for="page in pagers"
        :key="page"
        class="pagination__page"
        :class="{ 'pagination__page--active': page === currentPage }"
        @click="changeCurrentPage(page)"
      >
        {{ page }}
      </li>
    </ul>
    <button class="pagination__next" @click="nextPage">下一页</button>
    <label class="pagination__goto">
      <span>跳转</span>
      <input
        type="text"
        @blur="changeCurrentPage(Number($event.target.value))"
        @keydown.enter="changeCurrentPage(Number($event.target.value))"
      />
    </label>
  </section>
</template>

<style scoped lang="less">
.pagination__warp {
  display: flex;
  align-items: center;
  .pagination__pager {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    .pagination__page {
      padding: 0 4px;
      background: #fff;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      margin: 0;
      &:hover {
        color: #409eff;
      }
      &.pagination__page--active {
        color: #409eff;
      }
    }
  }
  .pagination__goto {
    margin-left: 14px;
  }
}
</style>
