<script setup lang="ts">
//多写了一个表格列props类型，使用defineProps定义类型时，类型必需写在当前页面，导入的类型会报错
interface ColumnProps {
  label: string;
  prop?: string;
  width?: number | string;
  sortable?: boolean | "custom" | "auto";
}
//hook
import useProps from "./hooks/useProps"; 

const props = withDefaults(defineProps<ColumnProps>(), {
  label: "",
  prop: "",
  width: "",
  sortable: false,
});
//处理表格列prop
useProps(props);
</script>

<template>
  <div></div>
</template>

<style>
</style>
