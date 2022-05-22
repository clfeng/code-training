import { defineComponent, toRefs } from 'vue'
import { tableHeaderCellProps } from './type'
import { DropdownItem } from 'components/Dropdown/type'
import TableHeaderSort from './TableHeaderSort'
import TableHeaderFilter from './TableHeaderFilter'

export default defineComponent({
    name: 'SimpleTableHeaderCell',
    props: tableHeaderCellProps,
    emits: ['changeSort', 'filterChange'],
    setup(props, { emit }) {
        let { column } = toRefs(props)
        let classList = {
            "table__cell": true,
            "table__cell--sort": column.value.sortable,
            "table_cell--filter": column.value.filters
        }

        function onClick() {
            if (column.value.sortable) {
                emit('changeSort', column)
            }
        }

        return () => {
            return (
                <th>
                    <div class={classList} onClick={onClick}>
                        {
                            column.value.headerRender({ column: column.value, $columnIndex: column.value.columnIndex })
                        }
                        {
                            column.value.sortable && <TableHeaderSort column={column.value} onChangeSort={(...args) => emit('changeSort', ...args)} />
                        }
                        {
                            column.value.filters && <TableHeaderFilter column={column.value} filters={column.value.filters} onFilterChange={(...args) => emit('filterChange', ...args)} />
                        }
                    </div>
                </th>
            )
        }
    },
})