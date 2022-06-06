import { PropType } from 'vue'
import { RowType, ColumnConfig } from 'components/SimpleTable/type'

export const tableBodyProps = {
    data: {
        type: Array as PropType<RowType[]>,
        default: () => []
    },
    columns: {
        type: Array as PropType<ColumnConfig[]>,
        default: () => []
    },
    rowKey: {
        type: String,
        default: ''
    }
}

export const tableBodyRowProps = {
    row: {
        type: Object as PropType<RowType>,
        default: () => ({})
    },
    columns: {
        type: Array as PropType<ColumnConfig[]>,
        default: () => []
    },
    index: {
        type: Number,
        default: -1
    }
}

export const tableBodyCellProps = {
    row: {
        type: Object as PropType<RowType>,
        default: () => ({})
    },
    column: {
        type: Object as PropType<ColumnConfig>,
        default: () => ({})
    },
    index: {
        type: Number,
        default: -1
    }
}