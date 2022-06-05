import { ExtractPropTypes } from "vue";

//  定义 Props
export const PaginationProps = {
  current: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 50,
  },
} as const;


export type TableProps = ExtractPropTypes<typeof PaginationProps>;
