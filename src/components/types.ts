import { ExtractPropTypes } from "vue";

//  定义 Props
export const tableProps = {
  test: {
    type: Boolean,
    default: false,
  },
} as const;

//  定义 Props
export type ListItemType = {
  name: string,
  age: number,
  address: string,
  sex: string
}


export type TableProps = ExtractPropTypes<typeof tableProps>;
