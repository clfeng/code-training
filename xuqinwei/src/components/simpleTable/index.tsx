import { defineComponent, ref } from "vue";
import { type TableProps, tableProps, ListItemType } from "@/types/table";
import SiPagination from '../simplePagination/index'

import './index.less'

export default defineComponent({
  name: "SimpleTable",
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    SiPagination
  },
  setup(props, { attrs, emit, slots }) {

    let isSort = false
    const headList = [
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'sex',
        label: '性别'
      },
      {
        prop: 'age',
        label: '年龄',
        isSort: true
      },
      {
        prop: 'address',
        label: '地址'
      }
    ]

    // let bodyList = ref<ListItemType[]>([])
    let total = ref<Number>()
    let pageSize = ref<Number>(10)
    let current = ref<Number>()
    function headClick(prop) {
      isSort = !isSort
      // 排序
    }

    return () => {
      return <div>
        <table class="table">
          <thead >
            <tr class="head-tr">
              {
                headList.map(item => {
                  return <th class="head-th">
                    {item.label}
                    {/* {
                      item.isSort && <i onClick={() => { headClick(item.prop) }}>^</i>
                    } */}
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody id="tbody">
            {
              props.data.map((item: ListItemType) => {
                return <tr class="body-tr">
                  {
                    headList.map(head => {
                      return <td class="body-td">{item[head.prop]}</td>
                    })
                  }

                </tr>
              })
            }
          </tbody>
        </table>
        {/* <si-pagination total={total.value}
          pageSize={pageSize.value}
          current={current.value}
          onChange={getList}></si-pagination> */}
      </div>

      // 记录
      // table分为3部分，header、container、footer
      // 表头：thead
      // 行： 表头行数据， 主要内容行数据

      // );
    };
  },
});
