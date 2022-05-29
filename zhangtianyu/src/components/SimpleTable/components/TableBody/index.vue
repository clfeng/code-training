<script lang="ts">
import { defineComponent, h } from "vue";
import { storeToRefs } from "pinia";
import useSimpleTableStore from "../../store/index";

export default defineComponent({
  name: "SimpleTableBody",
  setup() {
    let useSimpleTable = useSimpleTableStore();
    const { columns, filterData, rowKey } = storeToRefs(useSimpleTable);
    //因为需要使用表格列的插槽方法，所以表体组件使用自定义render方法
    return () =>
      h(
        "tbody",
        //表格数据
        filterData.value.map((row, index) =>
          h(
            "tr",
            { key: row[rowKey.value], class: "table-body__tr" },
            //每午的列信息
            columns.value.map((column) =>
              h(
                "td",
                { class: "table-body__td" },
                h(
                  "div",
                  { class: "table-body__cell" },
                  //当前列渲染内容的方法
                  column.render({ row, $index: index })
                )
              )
            )
          )
        )
      );
  },
});
</script>

<style lang="less" scoped>
.table-body__tr {
  border-bottom: 1px solid #ebeef5;
  .table-body__td {
    padding: 12px 10px;
    .table-body__cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
  }
}
</style>