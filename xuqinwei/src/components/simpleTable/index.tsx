import { defineComponent, ref } from "vue";
import SiPagination from '../simplePagination/index';
import SiThead from './components/simpleThead/index';
import SiColgroup from './components/simpleColgroup/index';
import { type TableProps, ListType, tableProps } from "@/types/table";
import useBaseConfig from '@/hooks/useTable/useBaseConfig';
import useTableColumn from '@/hooks/useTable/useTableColumns';

import './index.less'
import useData from "@/hooks/useTable/useData";
import useSortable from "@/hooks/useTable/useSortable";

export default defineComponent({
  name: "SimpleTable",
  props: {
    data: {
      type: Array,
      default: () => { [] }
    },
    pagination: {
      type: Object,
      defalut: () => ({
        total: 10,
        pageSize: 10,
        current: 1
      })
    },
    rowKey: {
      type: String,
      default: ''
    },
    defaultSort: {
      type: Array,
      default: () => { [] }
    }

  },
  components: {
    SiPagination,
    SiThead,
    SiColgroup
  },
  emits: ['sort'],
  setup(props: TableProps, { attrs, emit, slots }) {

    function handlePaginationChange(current: Number) {
      // 暂时只做了页数切换，每页的条数未做
      emit('change', current)
    }

    // 获取基本信息
    const [baseConfig] = useBaseConfig(props)
    const [dataColumns] = useTableColumn(slots.default);
    const { sortColumns, sortCallBack } = useSortable(dataColumns, emit)
    // 处理后的数据
    const dealDate = useData(props, sortColumns, baseConfig)

    return () => {
      return <div>
        <table class="table">
          <si-colgroup dataColumns={dataColumns.value}></si-colgroup>
          <thead >
            {/* 表头组件 */}
            <si-thead dataColumns={dataColumns.value} onSort={sortCallBack}></si-thead>
          </thead>
          <tbody id="tbody">
            {
              dealDate.value.map((item: ListType) => {
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
        <div class="table-pagination">
          <si-pagination total={props.pagination.total}
            pageSize={props.pagination.pageSize}
            current={props.pagination.current}
            onChange={handlePaginationChange}></si-pagination>

        </div>
      </div>
    };
  },
});
