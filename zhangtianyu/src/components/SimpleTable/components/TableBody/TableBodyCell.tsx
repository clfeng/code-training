import { defineComponent, toRefs } from 'vue'
import { tableBodyCellProps } from './type'

export default defineComponent({
    name: 'SimpleTableBodyCell',
    props: tableBodyCellProps,
    setup(props, { }) {
        let { column, row, index } = toRefs(props)
        return () => {
            return (
                <td>
                    <div class="table__cell">
                        {
                            column.value.bodyRender({ row: row.value, $index: index.value })
                        }
                    </div>
                </td>
            )
        }
    },
})