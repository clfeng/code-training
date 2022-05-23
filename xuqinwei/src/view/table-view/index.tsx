import SimpleTable from '@/components/simpleTable'
import { defineComponent, ref } from "vue";
import { ListItemType } from "@/types/table";
import axios from 'axios'

/*
*   table组件的简单使用
*
*/
export default defineComponent({
  name: 'TableView',
  components: {
    SimpleTable
  },

  setup() {
    let current = ref<Number>()
    let dataSource = ref<ListItemType[]>([])

    function getList(num: number = 1) {
      current.value = num
      axios('user/list').then((res) => {
        dataSource.value = res.data.list
      }).catch(() => {
        console.trace('信息获取失败')
      })
    }

    getList()
    return () => {
      return (
        <SimpleTable data={dataSource.value} />
      )
    }
  }
})