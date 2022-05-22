import { computed, ComputedRef, Ref } from 'vue'
import { ColumnConfig, TableColumnSortOrder, defaultSortOrders, BaseConfig } from '../type'

export default function useSortable(baseConfig: BaseConfig, columns: ComputedRef<ColumnConfig[]>, emit: any) {
    let { orderColumnMultiple, orderBy } = baseConfig

    //记录所有需要排序的列
    let sortableColumns = computed(() => columns.value.filter(columns => columns.sortable))

    //已经在排序状态的列，用于给useData处理数据
    let activeSorters = computed(() => {
        let activeColumns = sortableColumns.value.filter(column => column.sortableConfig?.order !== TableColumnSortOrder.normal)

        let sorters: ColumnConfig[] = []

        //先使用传入的排序优先级，按优先级顺序插入
        orderBy.forEach(prop => {
            let index = activeColumns.findIndex(column => column.prop === prop)
            if (index >= 0) {
                //匹配到优先级，弹出来插入到sorters
                sorters.push(...activeColumns.splice(index, 1))
            }
        })
        //如果还有剩余，就按列的位置来决定排序优先级
        activeColumns.forEach(column => {
            sorters.push(column)
        })

        let info = sorters.map(sorter => {
            return { label: sorter.label, prop: sorter.prop, order: TableColumnSortOrder[sorter.sortableConfig!.order] }
        })
        console.log(`排序优先级为:${JSON.stringify(info)}`)

        return sorters
    })

    //列标题点击排序时回调
    let onChangeSort = function (column: Ref<ColumnConfig>, order?: TableColumnSortOrder) {
        let { prop, sortableConfig } = column.value
        if (sortableConfig) {
            let nextOrder: TableColumnSortOrder = TableColumnSortOrder.normal
            if (order) {
                //如果传入了order，说明点击了升序或降序按钮
                if (sortableConfig.order === order) {
                    //如果点击的按钮已经在排序，就取消
                    nextOrder = TableColumnSortOrder.normal
                } else {
                    //否则使用点击的排序按钮来排序
                    nextOrder = order
                }
            } else {
                //未传入order，说明点击了列标题，就按照外部传入的 或者 默认的排序顺序来轮流

                //如果未传入自定义排序顺序，就使用默认的 正常、升充、降序来排
                let sortOrders = sortableConfig.sortOrders ?? defaultSortOrders

                //先将当前排序的枚举值换成对应的字符串
                let curOrderString = TableColumnSortOrder[sortableConfig.order]

                //查找当前排序在 排序顺序数组 中的位置
                let index = sortOrders.indexOf(curOrderString)
                if (index >= 0) {
                    //找出即将要排序的位置
                    index = (index + 1) % sortOrders.length
                    //找出来再换成对应的枚举值
                    nextOrder = TableColumnSortOrder[sortOrders[index]]
                } else {
                    //如果没找到，设为顺序的第一位
                    nextOrder = TableColumnSortOrder[sortOrders[0]]
                }
            }
            sortableConfig.order = nextOrder
            if (!orderColumnMultiple) {
                //如果未开启多列排序，需要把其他列的排序清空
                sortableColumns.value.forEach(column => {
                    if (column.prop !== prop && column.sortableConfig) {
                        column.sortableConfig.order = TableColumnSortOrder.normal
                    }
                })
            }
            //通知外部回调
            emit('sortChange', { prop, order: TableColumnSortOrder[nextOrder] })
        }
    }

    return { activeSorters, onChangeSort }

}