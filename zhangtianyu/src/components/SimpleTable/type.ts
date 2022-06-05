// 表格类型定义

import { VNode, PropType, ExtractPropTypes } from 'vue'

import { DropdownItem } from 'components/Dropdown/type'

//定义表格props
export const tableProps = {
    data: {
        type: Array as PropType<RowType[]>, //列表数据
        default: () => []
    },
    rowKey: {
        type: String, //行key
        default: ''
    },
    height: {
        type: [Number, String] as PropType<string | number>,
        default: ''
    },
    defaultSort: {
        type: [Object, Array] as PropType<DefaultSort | DefaultSort[]>, //默认排序规则
    },
    orderType: {
        type: [Boolean, String] as PropType<OrderType>, //排序类型，传'custom‘为自定义排序
        default: false
    },
    orderColumnMultiple: {   //是否支持多列排序
        type: Boolean,
        default: false
    },
    orderBy: {
        type: Array as PropType<string[]>, //排序优先级，默认根据列的顺序来
        default: () => []
    },
    filterType: {
        type: [Boolean, String] as PropType<FilterType>, //筛选类型，传'custom'为自定义筛选
        default: false
    },
    filterColumnMultiple: { //是否支持多列筛选
        type: Boolean,
        default: false
    },
    total: {
        type: Number, //总条目数
        default: 10
    },
    pageSize: {
        type: Number, //每页显示条目个数
        default: 10
    },
    currentPage: { //当前页数
        type: Number,
        default: 1
    },
    pagerCount: {
        type: Number, //页码按钮显示的最多数量,
        default: 7
    }
}

export type TableProps = ExtractPropTypes<typeof tableProps>

//  定义表格列Props
export const columnProps = {
    label: {
        type: String, //列标题
        default: '',
    },
    prop: {
        type: String, //渲染列内容的标识
        default: ''
    },
    width: {
        type: [String, Number] as PropType<string | number>, //列宽
        default: ''
    },
    sortable: {
        type: Boolean,  //是否开启排序
        default: false
    },
    sortOrders: {
        type: Array as PropType<TableColumnSortOrderString[]> //排序轮流方式
    },
    filters: {
        type: Array as PropType<DropdownItem[]> //是否开启过滤，传递一个数据
    }
} as const;

//表格列props类型
export type ColumnProps = ExtractPropTypes<typeof columnProps>;

export interface ColumnRender {
    headerRender: (data: { column: ColumnConfig, $columnIndex: number }) => VNode //表头渲染方法
    bodyRender: (data: { row: RowType, $index: number }) => VNode //表体渲染方法
}

//列配置信息类型
export interface ColumnConfig extends ColumnProps, ColumnRender {
    columnIndex: number // 列索引
    key: string // 列key
    sortableConfig?: SortableConfig //列排序的信息
    filterConfig?: FilterConfig // 列筛选的信息
}

//每行的数据
export type RowType = any

export enum TableColumnSortOrder { //排序的枚举值
    normal = 0,
    asc = 1,
    desc = 2
}

export type TableColumnSortOrderString = 'asc' | 'desc' | 'normal' //排序枚举值对应的字符串

export const defaultSortOrders: TableColumnSortOrderString[] = ['normal', 'asc', 'desc'] //默认排序轮流方式

export interface DefaultSort {  //默认排序规则
    prop: string, //列prop
    order: TableColumnSortOrderString //列排序状态，外部传入的，保存为字符串
}

export type OrderType = boolean | 'custom' //排序类型

export interface SortableConfig { //排序信息
    order: TableColumnSortOrder, //列排序状态，内部自己维护的枚举值
    sortOrders: TableColumnSortOrderString[] //列排序轮流方式
    asc: boolean, //是否可以升序
    desc: boolean //是否可以降序
}

export type FilterType = boolean | 'custom' //筛选类型

export interface FilterConfig { //筛选配信息
    value: any
}

export interface BaseConfig {  //列的基本信息
    rowKey: string
    defaultSort?: DefaultSort | DefaultSort[]
    orderType: OrderType
    orderColumnMultiple: boolean,
    orderBy: string[]
    filterType: FilterType,
    filterColumnMultiple: boolean
}

