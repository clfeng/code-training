import { State } from './type'
import { ColumnConfig, OrderType, SortInfo } from '../type'

import { defineStore } from "pinia"

const useSimpleTableStore = defineStore({
    id: 'SimpleTable',
    state: (): State => ({
        data: [], //渲染表格的数据
        columns: [],//列信息
        rowKey: '',//行的key
        sort: { //排序信息
            prop: '',
            order: OrderType.normal,
            type: false,
        },
        tableListener: {},//保存表格接收的事件
    }),
    getters: {
        //过滤表格数据，目前只有排序用到了
        filterData(): any[] {
            let { prop, order, type } = this.sort
            //如果存在不是‘custom’的升/降序，
            if ([true, 'auto'].includes(type) && prop && order !== OrderType.normal) {
                //sort会改变数组本身，需要浅拷贝一份
                return [...this.data].sort((x, y) => {
                    if (order === OrderType.asc) {
                        return x[prop] - y[prop]
                    }
                    return y[prop] - x[prop]
                })
            }
            return this.data
        }
    },
    actions: {
        setData(data: any[]) {
            this.data = data
        },
        setColumns(column: ColumnConfig) {
            this.columns.push(column)
        },
        setRowKey(rowKey: string) {
            this.rowKey = rowKey
        },
        setSortInfo(sort: SortInfo) {
            this.sort = sort
            //触发排序变更方法
            this.tableListener['sort-change']?.({
                ...sort,
                order: OrderType[sort.order]
            })
        }
    }
})

export default useSimpleTableStore