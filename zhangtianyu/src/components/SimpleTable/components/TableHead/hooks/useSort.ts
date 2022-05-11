import { OrderType, ColumnConfig, SortInfo } from "../../../type";
import { storeToRefs } from "pinia";
import useSimpleTableStore from "../../../store/index";

export default function useSort() {
    let useSimpleTable = useSimpleTableStore();
    const { sort } = storeToRefs(useSimpleTable);

    //切换当前排序
    function toggleOrder() {
        //按照正常/升序/降序来回轮流
        //如果超出排序的上界，就从正常开始
        return (sort.value.order + 1) % OrderType.outRange
    }

    return function changeSort(column: ColumnConfig, order?: OrderType) {
        //如果当前列没有排序，不做处理
        if (column.sortable === false) {
            return
        }
        let { prop, sortable } = column
        //如果点击的还是当前排序列，切换排序顺序
        if (sort.value.prop === prop) {
            if (order === sort.value.order) {
                //如果点击的按钮是当前排序的方式 ，直接恢复正常
                return useSimpleTable.setSortInfo({
                    prop,
                    type: sortable,
                    order: OrderType.normal,
                })
            } else {
                //否则使用点击的按钮排序方式 ，如果没有就轮流
                return useSimpleTable.setSortInfo({
                    prop,
                    type: sortable,
                    order: order ?? toggleOrder()
                })
            }
        } else {
            //切换了排序列，从升序开始
            return useSimpleTable.setSortInfo({
                prop,
                type: sortable,
                order: order ?? OrderType.asc
            })
        }
    }
}