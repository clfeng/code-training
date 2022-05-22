import { defineComponent, toRefs } from 'vue'
import { tableBodyRowProps } from './type'
import TableBodyCell from './TableBodyCell'

export default defineComponent({
    name: 'SimpleTableBodyRow',
    props: tableBodyRowProps,
    setup(props, { }) {
        let { row, columns, index } = toRefs(props)
        return () => {
            return (
                <tr>
                    {
                        columns.value.map(column => <TableBodyCell key={column.key} row={row} column={column} index={index.value} />)
                    }
                </tr>
            )
        }
    },
})