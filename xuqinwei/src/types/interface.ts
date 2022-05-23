// 定义column
export interface ColumnType<RecordType> {
  prop?: string;
  data?: RecordType; //TODO待定义
  colspan?: number;
  rowSpan?: number;
  dataIndex?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  resizeable?: boolean;
  key?: string | number;
  class?: string;
  fixed?: boolean;
  align?: 'left' | 'center' | 'right';
  customFilterDropdown?: boolean;
  onCellClick?: () => void;
  customCell?: () => void;
  // slot?: '';
}