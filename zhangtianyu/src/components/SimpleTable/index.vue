<script setup lang="ts">
//多写了一个表格props类型，使用defineProps定义类型时，类型必需写在当前页面，导入的类型会报错
interface TableProps {
  data?: any[];
  rowKey?: string;
}
//组件
import TableHead from "./components/TableHead/index.vue"; //表头
import TableBody from "./components/TableBody/index.vue"; //表体
//hook
import useProps from "./hooks/useProps"; //处理表格props
import useEmit from "./hooks/useEmit"; //处理表格监听事件
//常量
import { tableListener } from "./const";

const emit = defineEmits(tableListener);
//处理监听事件
useEmit(emit);

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  rowKey: "",
});

//处理props
useProps(props);
</script>

<template>
  <section class="simple-table__warp">
    <div class="hidden">
      <slot />
    </div>
    <table cellspacing="0" border="0" cellpadding="0" class="simple-table">
      <table-head />
      <table-body />
    </table>
  </section>
</template>

<style scoped lang="less">
.simple-table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  .hidden {
    display: none;
  }
}
</style>
