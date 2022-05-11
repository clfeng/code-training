import { ExtractPropTypes } from "vue";

//  定义 Props
export const tableProps = {
  dataSource: {
    type: Array,
  },
  columns: {
    type: Array,
  }
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;


export type TableProp = {
  dataSource: DataSource[];   //数据源
  columns: Columns[];         //列
}


export type DataSource = {
  key: string,
  name: string,
  age: number,
  address: string,
}

export type Columns = {
  key: string,
  title: string,
  dataIndex: string,
  sortOrder?: boolean   //排序
}

export type DataSourceKey = keyof  DataSource;

