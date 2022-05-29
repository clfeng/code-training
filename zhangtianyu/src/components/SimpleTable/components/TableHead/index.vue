<script setup lang="ts">
import { OrderType, ColumnConfig } from "../../type";
import { storeToRefs } from "pinia";
//hook
import useSort from "./hooks/useSort";

import useSimpleTableStore from "../../store/index";
let useSimpleTable = useSimpleTableStore();
const { columns, sort } = storeToRefs(useSimpleTable);

//处理表格排序
let changeSort = useSort();

//监听当前表头列的方法，目前只有排序用到了，
function onClickTH(column: ColumnConfig) {
  changeSort(column);
}
</script>

<template>
  <colgroup>
    <col v-for="column in columns" :key="column.prop" :width="column.width" />
  </colgroup>
  <thead class="table-head">
    <tr class="table-head__tr">
      <th class="table-head__th" v-for="column in columns" :key="column.prop">
        <div
          class="table-head__cell"
          :class="{ 'table-head__cell--sort': column.sortable }"
          @click.stop="onClickTH(column)"
        >
          {{ column.label }}
          <!-- 排序 -->
          <div
            v-if="column.sortable"
            class="table-head__sort"
            :class="{ 'table-head__sort--active': column.prop === sort.prop }"
            @click.stop="changeSort(column)"
          >
            <!-- 升序按钮 -->
            <span
              class="sort__icon iconfont icon-paixu-shang"
              :class="{ 'sort__icon--active': OrderType.asc == sort.order }"
              @click.stop="changeSort(column, OrderType.asc)"
            ></span>
            <!-- 降序按钮 -->
            <span
              class="sort__icon iconfont icon-paixu-xia"
              :class="{ 'sort__icon--active': OrderType.desc == sort.order }"
              @click.stop="changeSort(column, OrderType.desc)"
            ></span>
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<style scoped lang="less">
.table-head__tr {
  border-bottom: 1px solid #ebeef5;
  .table-head__th {
    padding: 12px 10px;
    text-align: left;
    .table-head__cell--sort {
      display: flex;
      align-items: center;
      cursor: pointer;
      .table-head__sort {
        display: flex;
        flex-direction: column;
        margin-left: 6px;
        .sort__icon {
          font-size: 12px;
        }
        &.table-head__sort--active {
          .sort__icon--active {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
