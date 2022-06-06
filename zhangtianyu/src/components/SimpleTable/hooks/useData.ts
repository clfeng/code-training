import { computed, ComputedRef, Ref, toRefs } from 'vue'
import { TableProps, ColumnConfig, TableColumnSortOrder, RowType, BaseConfig } from '../type'

function filtersData(data: Ref<RowType[]>, baseConfig: BaseConfig, activeFilters: ComputedRef<ColumnConfig[]>) {
    let { filterType } = baseConfig
    if (filterType === 'custom' || data.value.length == 0 || activeFilters.value.length === 0) {
        return data.value
    }
    //筛选数据，当前列内容与筛选数据相同的，则保留
    return data.value.filter(row => {
        return activeFilters.value.some(filter => {
            return filter.filterConfig?.value === row[filter.prop]
        })
    })
}

function sortData(data: Ref<RowType[]>, baseConfig: BaseConfig, activeSorters: ComputedRef<ColumnConfig[]>) {
    let { orderType } = baseConfig
    if (orderType === 'custom' || data.value.length == 0) {
        return data.value
    }
    let sortedData = data.value.slice()
    //先把排序优先级数组反转，再根据排序信息对数组排序
    activeSorters.value.slice().reverse().forEach(sorter => {
        let { prop, sortableConfig } = sorter
        let flag = sortableConfig?.order === TableColumnSortOrder.asc ? 1 : -1
        sortedData.sort((a, b) => {
            return (a[prop] - b[prop]) * flag
        })
    })
    return sortedData
}

export default function useData(props: TableProps, baseConfig: BaseConfig, activeSorters: ComputedRef<ColumnConfig[]>, activeFilters: ComputedRef<ColumnConfig[]>) {
    let { data } = toRefs(props)

    //根据筛选信息处理数据
    let filterData = computed(() => {
        let newData = filtersData(data, baseConfig, activeFilters)
        console.log(`筛选后的数组:`, newData)
        return newData
    })

    //根据排序信息处理数据
    let sortedData = computed(() => {
        let newData = sortData(filterData, baseConfig, activeSorters)
        console.log(`排序后的数组:`, newData)
        return newData
    })


    return sortedData
}