import { defineComponent, toRefs, computed } from 'vue'
import Dropdown from 'src/components/Dropdown/index'
import { DropdownItem } from 'components/Dropdown/type'

import { tableHeaderFilterProps } from './type'

export default defineComponent({
    name: 'TableHeaderFilter',
    props: tableHeaderFilterProps,
    emits: ['filterChange'],
    setup(props, { emit }) {
        let { filters, column } = toRefs(props)

        function filterChange(value: any) {
            emit('filterChange', column, value)
        }


        return () => {
            return (
                <Dropdown modelValue={column.value.filterConfig?.value} data={filters.value} onFilterChange={(value) => filterChange(value)} />
            )
        }
    },
})