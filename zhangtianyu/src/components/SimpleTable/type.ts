//表格props
export interface TableProps {
    data: any[]; //渲染的数据
    rowKey: string //行key
}

//表格列props
export interface ColumnProps {
    label: string //列标题
    prop: string //列属性
    width: number | string //列宽
    sortable: SortableType // 排序类型
}


//列配置信息
export interface ColumnConfig {
    label: string //列名
    prop: string //列属性名
    width: number | string //列宽
    sortable: SortableType //列排序类型
    render: (data: { row: any, $index: number }) => any //渲染列内容的方法
}

export enum OrderType { //排序信息
    normal = 0, //正常
    asc = 1, //升序
    desc = 2, //降序
    outRange = 3, //记录下排序信息的上界
}

export type SortableType = boolean | 'custom' | 'auto' //false不排序、true|'auto'表格自动根据当前data数组排序, 'custom'自定义排序，需要监听sort-change事件

export interface SortInfo { //排序信息
    prop: string //当前排序的属性名
    order: OrderType //当前排序的方式 
    type: SortableType //当前排序的类型
}