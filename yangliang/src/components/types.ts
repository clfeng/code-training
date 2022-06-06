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


export type Data = {
  total:number, 
  dataSource: any[]
}

//
export type HeaderRowProps = {
  columns: Column[];
  sorter: (key: string, asc: boolean) => void;
}