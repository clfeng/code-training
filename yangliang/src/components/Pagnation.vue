<template>
   <div class="page">
    <span class="page-block center"
          @click="pageChange(1)">{{'«'}}</span>
    <span v-if="pageList[2]-2>1"
          class="page-block center">...</span>
    <span v-for="pageNum in pageList"
          :key="pageNum"
          class="page-block center"
          :style="{color:pageNum === page?'#80bd01':'#778087'}"
          @click="pageChange(pageNum)">{{pageNum}}</span>
    <span v-if="pageMax-pageList[2]>2"
          class="page-block center">...</span>
    <span class="page-block center"
          @click="pageChange(pageMax)">{{'»'}}</span>
    <span>跳至<input v-if="showQuickJumper"
                     v-model="jumpPage"
                     type="text" 
                     class="jump" 
                     @input="onJump">页</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits, watch, ref } from 'vue';
const props = defineProps({
    total: {
      type: Number,
      default: 0
    },
    // 每页数量
    limit: {
      type: Number,
      default: 10
    },
    // 当前页码
    page: {
      type: Number,
      default: 1
    },
    showQuickJumper: {      //是否展示快速跳转
      type: Boolean,
      default: false
    },
})

const jumpPage = ref('');

const emit = defineEmits(['page-change']);


const pageMax = computed<number>({
    get(){
        return Math.ceil(props.total / props.limit)
    },
    set(val){
      
    }
})

const arr = [];

for (let i = 1; i <= pageMax.value; i++) {
  arr.push(i);
}

const pageList = ref(arr);

function pageChange (pageCurrent:number){
    emit('page-change', pageCurrent)
}

function initData (){
      pageList.value = []; // 清空页码
      var i = 1;
      do {
        pageList.value.push(i);
        i++;
      } while (i <= pageMax.value);
      pageList.value.length > 5 && // 最多显示5页
      (pageList.value = pageList.value.slice(0, 5));
}

watch(() => props.page, (val)=>{
    if (val <= 3) {
        pageList.value = [];
        var i = 1;
        do {
          pageList.value.push(i);
          i++;
        } while (i <= pageMax.value);
        pageList.value.length > 5 && // 最多显示5页
          (pageList.value = pageList.value.slice(0, 5));
      } else if (val === pageMax.value) {
        pageList.value = [val - 2, val - 1, val];
      } else if (val === pageMax.value - 1) {
        pageList.value = [val - 2, val - 1, val, val + 1];
      } else {
        pageList.value = [val - 2, val - 1, val, val + 1, val + 2];
      }
})

watch(() => props.total, (val)=>{
    initData();
})

function onJump () {
  const curPage = Number(jumpPage.value);
  if (curPage > 0 && curPage <= pageMax.value) {
    emit('page-change', curPage);
  }
}


</script>

<style>
.page {
  padding: 10px;
  background-color: #fff;
}
.page-block{
    display: inline-block;
    width: 30px;
    height: 28px;
    padding: 4px 8px;
    font-size: 0.8em;
    line-height: 18px;
    border: 1px solid #ddd;
    border-right: none;
    box-sizing: border-box;
}
.page-block::first-child {
  width: 34px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.page-block:last-child {
  width: 34px;
  border-right: 1px solid #ddd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.jump {
  width: 30px;
}
</style>