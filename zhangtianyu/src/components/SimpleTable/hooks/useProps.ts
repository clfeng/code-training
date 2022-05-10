import { TableProps } from '../type'
import useSimpleTableStore from '../store/index'
import { toRefs, watchEffect } from 'vue'

export default function useProps(props: TableProps) {
    let useSimpleTable = useSimpleTableStore()
    let { data, rowKey } = toRefs(props)
    watchEffect(() => {
        //保存data数据与rowkey
        useSimpleTable.setData(data.value)
        useSimpleTable.setRowKey(rowKey.value)
    })
}