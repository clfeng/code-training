import { ExtractPropTypes } from "vue";


//  定义 PaegerProps

export const pagerProps = {
  page: {
    type: Number,
  },
  active: {
    type: Boolean
  },
  onClick: {
    type: Function,
    default: () => {}
  }
} as const;

export type PagerProps = ExtractPropTypes<typeof pagerProps>;

//  定义 paginationProps

export const paginationProps = {
  current: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean
  },
  hideOnSinglePage: {
    type: Boolean
  },
  defaultPageSize: {
    type: Number
  },
  pageSize: {
    type: Number,
    default: 10
  },
  showTotal: {
    type: Boolean
  },
  total: {
    type: Number,
    default: 0
  },
  showSizeChanger: {
    type: Boolean,
    default: true
  },
  pageSizeOptions: {
    type: Array
  },
  showSizeChange: {
    type: Function
  },
  showQuickJumper: {
    type: Boolean,
    default: false
  },
  change: {
    type: Function,
    default:(page:number) => {}
  },
  showPre: {
    type: Boolean,
    default: true
  },
  showNext: {
    type: Boolean,
    default: true
  }
} as const;

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;



export const headerRowProps = { 
  cells: {
    type: Array,
    default: []
  }
}

export type HeaderRowProps = ExtractPropTypes<typeof headerRowProps>;


export type Column = {
  dataKey: string | number,
  ellipsis: boolean,
  align: 'left' | 'right' | 'center',
  fixed: boolean,
  sortOrder: 'ascend' | 'descend' | undefined,
  resizable: boolean,
  title: string,
  key: string,
  sorter: boolean
}