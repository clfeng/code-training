import { ExtractPropTypes } from "vue";

//  定义 Props
export const tableProps = {
  test: {
    type: Boolean,
    default: false,
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
