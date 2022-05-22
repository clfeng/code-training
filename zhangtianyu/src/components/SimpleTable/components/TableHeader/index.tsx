import { defineComponent, toRefs } from 'vue'
import { tableHeaderProps } from './type'
//组件
import TableHeaderRow from './TableHeaderRow'
import TableCol from '../TableCol/index'

export default defineComponent({
    name: 'SimpleTableHeader',
    props: tableHeaderProps,
    emits: ['changeSort','filterChange'],
    setup(props, { emit }) {
        let { columns } = toRefs(props)

        return () => {
            return (
                <table>
                    <TableCol columns={columns.value} />
                    <thead>
                        <TableHeaderRow onFilterChange={(...args)=>emit('filterChange',...args)} onChangeSort={(...args) => emit('changeSort', ...args)} columns={columns.value} />
                    </thead>
                </table>
            )
        }
    },
})