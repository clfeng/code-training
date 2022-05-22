import { defineComponent, toRefs } from 'vue'
import { tableHeaderCellProps } from './type'
import { TableColumnSortOrder } from 'components/SimpleTable/type'

export default defineComponent({
    name: 'SimpleTableHeaderCell',
    props: tableHeaderCellProps,
    emits: ['changeSort'],
    setup(props, { emit }) {
        let { column } = toRefs(props)
        let onChangeSort = (event: MouseEvent, order?: TableColumnSortOrder) => {
            event.stopPropagation()
            emit('changeSort', column, order)
        }
        return () => {
            let ascClass = {
                "sort__icon": true,
                "iconfont": true,
                "icon-paixu-shang": true,
                "sort__icon--active": column.value.sortableConfig?.order === TableColumnSortOrder.asc
            }
            let descClass = {
                "sort__icon": true,
                "iconfont": true,
                "icon-paixu-xia": true,
                "sort__icon--active": column.value.sortableConfig?.order === TableColumnSortOrder.desc
            }
            return (
                <div class="table__sort">
                    {
                        /* 升序按钮 */
                        column.value.sortableConfig?.asc && <span class={ascClass} onClick={(event: MouseEvent) => onChangeSort(event, TableColumnSortOrder.asc)}></span>
                    }
                    {
                        /* 降序按钮 */
                        column.value.sortableConfig?.desc && <span class={descClass} onClick={(event: MouseEvent) => onChangeSort(event, TableColumnSortOrder.desc)}></span>
                    }
                </div>
            )
        }
    },
})