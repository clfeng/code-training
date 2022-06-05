import { defineComponent, ref } from "vue";
import SiPagination from '../simplePagination/index';
import SiThead from '../simpleThead/index';
import { type TableProps, tableProps, ListItemType } from "@/types/table";
import useTableColumn from '@/hooks/useTable/useTableColumns'

import './index.less'

export default defineComponent({
  name: "SimpleTable",
  props: {
    data: {
      type: Array,
      default: []
    },
    pagination: {
      type: Object,
      defalut: {
        total: 10,
        pageSize: 10,
        current: 1
      }
    }
  },
  components: {
    SiPagination,
    SiThead
  },
  setup(props, { attrs, emit, slots }) {
    function headClick(prop) {
      // isSort = !isSort
      // 排序
      console.trace('暂未提供排序功能')
    }

    function handlePaginationChange(current: Number) {
      // 暂时只做了页数切换，每页的条数未做
      emit('change', current)
    }

    const [dataColumns] = useTableColumn(slots.default)

    return () => {
      return <div>
        <table class="table">
          <colgroup>
            {/* 计算列宽 */}
          </colgroup>
          <thead >
            {/* 表头组件 */}
            <si-thead dataColumns={dataColumns.value}></si-thead>
          </thead>
          <tbody id="tbody">
            {
              props.data.map((item: ListItemType) => {
                return <tr class="body-tr">
                  {
                    dataColumns.value.map(head => {
                      return <td class="body-td">{item[head.prop]}</td>
                    })
                  }

                </tr>
              })
            }
          </tbody>
        </table>
        <div class="si-table__footer" >
          <slot name="title"></slot>
        </div>
        <si-pagination total={props.pagination?.total}
          pageSize={props.pagination?.pageSize}
          current={props.pagination?.current}
          onChange={handlePaginationChange}></si-pagination>
      </div>

      // 记录
      // table分为3部分，header、container、footer
      // 表头：thead
      // 行： 表头行数据， 主要内容行数据

      // );
    };
  },
});
