import { defineComponent, toRefs } from 'vue'
import { tableHeaderProps } from './type'
//组件
import TableHeaderCell from './TableHeaderCell'

export default defineComponent({
    name: 'SimpleTableHeaderRow',
    props: tableHeaderProps,
    emits: ['changeSort', 'filterChange'],
    setup(props, { emit }) {
        let { columns } = toRefs(props)
        return () => {
            return (
                <tr>
                    {
                        columns.value.map(column => <TableHeaderCell key={column.key} column={column} onFilterChange={(...args)=>emit('filterChange',...args)} onChangeSort={(...args) => emit('changeSort', ...args)} />)
                    }
                </tr>
            )
        }
    },
})