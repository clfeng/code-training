import { defineComponent, toRefs } from 'vue'
import { tableBodyProps } from './type'
import TableBodyRow from './TableBodyRow'
import TableCol from '../TableCol/index'

export default defineComponent({
    name: 'SimpleTableBody',
    props: tableBodyProps,
    setup(props, { }) {
        let { columns, data, rowKey } = toRefs(props)
        return () => {
            return (
                <table>
                    <TableCol columns={columns.value} />
                    <tbody>
                        {
                            data.value.map((row, index) => <TableBodyRow row={row} key={row[rowKey.value]} columns={columns.value} index={index} />)
                        }
                    </tbody>
                </table>
            )
        }
    },
})