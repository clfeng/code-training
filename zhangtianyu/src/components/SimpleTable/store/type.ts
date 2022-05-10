import { ColumnConfig, SortInfo } from '../type'

//表格store的state类型
export interface State {
    data: any[], //表格数据
    columns: ColumnConfig[], //所有列配置信息
    rowKey: string, //行key
    sort: SortInfo //排序信息
    tableListener: Record<string, Function> //保存表格接收的事件
}

