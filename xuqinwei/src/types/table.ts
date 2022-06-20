import { ExtractPropTypes, PropType } from "vue";

//定义表格参数
export const tableProps = {
  data: {
    type: Array as PropType<ListType[]>, //列表数据
    default: () => []
  },
  rowKey: {
    type: String, //行key
    default: ''
  },
  defaultSort: {
    type: [Object, Array] as PropType<SortOrders | SortOrders[]>, //默认排序规则
  },
  orderType: {
    type: [Boolean, String] as PropType<OrderType>, //排序类型，customize为自定义排序
    default: false
  },
  total: {
    type: Number, //总条目数
    default: 10
  },
  pagination: {
    type: [Object] as PropType<Pagination>,
  }
  // 未列出高度、是否支持多列排序、排序优先级、过滤相关参数
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

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
  order: {
    type: String,
  }
  // 未写参数：过滤相关参数
} as const;

export type ColumnProps = ExtractPropTypes<typeof columnProps>;

// 定义列表类型
export type ListType = {
  name: string,
  age: number,
  address: string,
  sex: string
};

export enum ColumnSortOrder {
  normal = 0,
  asc = 1,
  desc = 2
}
export type OrderType = boolean | 'customize' // 自定义排序或无排序
export type Pagination = {
  total: number,
  pageSize: number,
  current: number,
}


// 排序方式： 默认、升序、降序
export type SortOrders = 'normal' | 'desc' | 'asc'
export const defaultSortOrder: SortOrders[] = ['normal', 'desc', 'asc']

export interface SortableConfig { //排序信息
  order: ColumnSortOrder, //列排序状态，内部自己维护的枚举值
  sortOrders: SortOrders[] //列排序轮流方式
  asc: boolean, //是否可以升序
  desc: boolean //是否可以降序
}

export interface BaseConfig {  //列的基本信息
  rowKey: string
  defaultSort?: SortOrders | SortOrders[]
  orderType: OrderType
  orderColumnMultiple: boolean,
  orderBy: string[]
}

