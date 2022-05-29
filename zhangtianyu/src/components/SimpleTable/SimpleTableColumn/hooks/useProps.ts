import { ColumnProps, ColumnConfig } from '../../type'
import useSimpleTableStore from '../../store/index'
import { toRefs, watchEffect, useSlots } from 'vue'

export default function useProps(props: ColumnProps) {
    let useSimpleTable = useSimpleTableStore()
    let { label, prop, width, sortable } = toRefs(props)
    let slots = useSlots()
    watchEffect(() => {
        //处理当前列信息，保存到store里，给表头与表体使用
        let column: ColumnConfig = {
            label: label.value,
            prop: prop.value,
            width: width.value,
            sortable: sortable.value,
            //渲染当前列内容的方法
            render: (data) => {
                //如果使用了插槽，使用插槽内容渲染
                if (slots.default) {
                    return slots.default(data)
                } else {
                    //没有插槽直接返回当前列信息
                    return data.row[prop.value]
                }
            }
        }
        useSimpleTable.setColumns(column)
    })
}