import { PropType } from 'vue'
import { ColumnConfig } from 'components/SimpleTable/type'
import { DropdownItem } from 'components/Dropdown/type'

export const tableHeaderProps = {
    columns: {
        type: Array as PropType<ColumnConfig[]>,
        default: () => []
    }
}

export const tableHeaderCellProps = {
    column: {
        type: Object as PropType<ColumnConfig>,
        default: () => ({})
    }
}

export const tableHeaderFilterProps = {
    filters: {
        type: Array as PropType<DropdownItem[]>,
        default: []
    },
    column: {
        type: Object as PropType<ColumnConfig>,
        default: () => ({})
    }
}