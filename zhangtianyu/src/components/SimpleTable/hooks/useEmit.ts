import { tableListener } from '../const'
import useSimpleTableStore from '../store/index'

export default function useEmit(emits: Function) {
    let useSimpleTable = useSimpleTableStore()
    //将表格接收到的事件保存下
    tableListener.forEach(name => {
        useSimpleTable.tableListener[name] = function (...args: any[]) {
            emits(name, ...args)
        }
    })
}