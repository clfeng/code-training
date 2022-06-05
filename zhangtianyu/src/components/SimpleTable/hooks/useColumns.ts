import { Slots, computed, VNode, reactive } from 'vue'
import { ColumnConfig, ColumnProps, DefaultSort, ColumnRender, FilterConfig } from 'components/SimpleTable/type'
import { TableColumnSortOrder, SortableConfig, BaseConfig, defaultSortOrders } from 'components/SimpleTable/type'

//收集列的筛选配置
function convertFilter(columnProps: ColumnProps) {
    let { filters, prop } = columnProps
    if (Array.isArray(filters)) {
        if (!prop) {
            console.warn(`开启过滤需要配置prop属性`)
            return {}
        }
        return {
            filters,
            filterConfig: reactive({
                value: ''
            }) as FilterConfig
        }
    }
    return {}
}

//收集列的排序配置
function convertSortable(columnProps: ColumnProps, baseConfig: BaseConfig) {
    let { sortable = false, prop } = columnProps
    //当前列不需要排序的话，直接返回，不需要收集排序配置
    if (sortable === false) {
        return { sortable: false }
    }
    //排序也需要prop
    if (!prop) {
        console.warn(`开启排序需要配置prop属性`)
        return { sortable: false }
    }
    let { defaultSort, orderColumnMultiple } = baseConfig
    //收集列默认排序
    let sort: DefaultSort | undefined
    //如果是 多列排序， 默认排序信息需要传递数组
    if (orderColumnMultiple && Array.isArray(defaultSort)) {
        sort = defaultSort.find(sort => sort.prop === prop)
    } else if (!orderColumnMultiple && typeof defaultSort === 'object' && !Array.isArray(defaultSort)) {
        //单列排序，默认排序信息需要传递对象
        if (defaultSort.prop === prop) {
            sort = defaultSort
        }
    } else if(defaultSort) {
        console.warn(`${orderColumnMultiple ? '开启' : '关闭'}属性orderColumnMultiple时，defaultSort需要传递${orderColumnMultiple ? '数组' : '对象'}`)
    }
    let order = TableColumnSortOrder.normal
    if (sort?.order) {
        //如果配置到默认排序信息，判断用户传入的是否合法
        if (defaultSortOrders.includes(sort.order)) {
            order = TableColumnSortOrder[sort.order]
        } else {
            console.warn(`传入的defaultSort参数order:${sort.order}不合法，取值范围：${defaultSortOrders.toString()}`)
        }
    }
    //排序轮流方式
    let sortOrders = columnProps.sortOrders ?? columnProps['sort-orders'] ?? defaultSortOrders
    return {
        sortable: true,
        sortableConfig: reactive({
            order,
            sortOrders,
            asc: sortOrders.includes('asc'), //列是否可以升序
            desc: sortOrders.includes('desc') //列是否可以降序
        }) as SortableConfig
    }
}

//收集列标题与列内容的渲染方法
function convertRender(columnProps: ColumnProps, vnode: VNode): ColumnRender {
    let { prop, label } = columnProps
    return {
        headerRender: (data) => {
            //表头列标题渲染方法，如果列使用了header插槽，使用插槽渲染，否则使用label
            if (vnode.children?.header) {
                return vnode.children.header(data)
            }
            if (!label) {
                console.warn(`第${data.$columnIndex + 1}列缺少标题`)
            }
            return label
        },
        bodyRender: (data) => {
            //表体列内容渲染方法，如果使用了默认插槽，使用插槽渲染，否则根据prop传的值来渲染
            if (vnode.children?.default) {
                return vnode.children.default(data)
            }
            return data.row[prop]
        }
    }
}

//收集列基本信息
function convertColumn(columnProps: ColumnProps, index: number) {
    let { label = '', prop = '', width = '' } = columnProps
    return {
        label,
        prop,
        width,
        key: prop || String(index),
        columnIndex: index,
    }
}

function mergeColumn<Column, Render, Sortable, Filters>(column: Column, render: Render, sortable: Sortable, filters: Filters): Column & Sortable & Render & Filters {
    return { ...column, ...render, ...sortable, ...filters }
}

export default function useColumns(baseConfig: BaseConfig, slots: Slots) {

    let columns = computed(() => {
        //通过表格的默认插槽方法，获取列的虚拟节点
        let defaultVnode = slots.default?.() ?? []
        console.log(defaultVnode, '列虚拟节点')

        let columnsConfig = defaultVnode.map((vnode, index): ColumnConfig => {
            let columnProps = vnode.props as ColumnProps
            return mergeColumn(
                convertColumn(columnProps, index),
                convertRender(columnProps, vnode),
                convertSortable(columnProps, baseConfig),
                convertFilter(columnProps)
            )
        })

        console.log(columnsConfig, '列配置信息')
        return columnsConfig
    })
    return columns
}