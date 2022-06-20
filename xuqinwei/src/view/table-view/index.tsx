import SimpleTable from '@/components/simpleTable';
import SimpleColumn from '@/components/simpleTable/components/simpleColumn/index.ts'
import { defineComponent, ref } from "vue";
import { ListType } from "@/types/table";
import { PaginationProps } from "@/types/pagination";
import axios from 'axios'

/*
*   table组件的简单使用
*
*/
export default defineComponent({
  name: 'TableView',
  components: {
    SimpleTable,
    SimpleColumn
  },

  setup() {
    let current = ref<Number>()
    let dataSource = ref<ListType[]>([])
    let pagination = ref<PaginationProps>({})

    function getList(cur: number = 1) {
      current.value = cur
      axios.post('/user/list', {
        current: cur
      }
      ).then(({ data }) => {
        dataSource.value = data.list
        pagination.value = {
          total: data.total,
          pageSize: data.pageSize,
          current: data.current,
        }
      }).catch(() => {
        console.trace('信息获取失败')
      })
    }

    getList()
    return () => {
      return (
        <simple-table data={dataSource.value}
          pagination={pagination.value}
          onChange={getList}
          row-key="id"
          default-sort={[{ prop: 'role', order: 'asc' }]}
          order-type={false} >
          <simple-column prop="name" label="姓名" />
          <simple-column prop="sex" label="性别" />
          <simple-column prop="age" label="年龄" order={'desc'} isSort={true} sortOrders={['normal', 'asc', 'desc']} />
          <simple-column prop="address" label="地址" width={200} />
        </simple-table>
      )
    }
  }
})