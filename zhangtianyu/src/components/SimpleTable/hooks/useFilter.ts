import { computed, ComputedRef, Ref } from 'vue'
import { ColumnConfig, BaseConfig } from '../type'

export default function useFilter(baseConfig: BaseConfig, columns: ComputedRef<ColumnConfig[]>, emit: any) {
    let { filterColumnMultiple } = baseConfig

    //记录所有需要筛选的列
    let filtersColumns = computed(() => columns.value.filter(columns => columns.filters))

    //已经在筛选状态的列，用于给useData处理数据
    let activeFilters = computed(() => {
        let activeColumns = filtersColumns.value.filter(column => column.filterConfig?.value !== '')

        let info = activeColumns.map(column => {
            return { label: column.label, prop: column.prop, filter: column.filterConfig }
        })
        console.log(`筛选项为:${JSON.stringify(info)}`)

        return activeColumns
    })

    //列标题点击筛选时回调
    let onFilterChange = function (column: Ref<ColumnConfig>, value: any) {
        let { prop, filterConfig } = column.value
        if (filterConfig) {
            filterConfig.value = value

            if (!filterColumnMultiple) {
                //如果未开启多列筛选，需要把其他列的筛选清空
                filtersColumns.value.forEach(column => {
                    if (column.prop !== prop && column.filterConfig) {
                        column.filterConfig.value = ''
                    }
                })
            }
            //通知外部回调
            emit('filterChange', { prop, filter: value })
        }

    }
    return { activeFilters, onFilterChange }
}