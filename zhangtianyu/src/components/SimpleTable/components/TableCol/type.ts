import { PropType } from 'vue'
import { ColumnConfig } from 'components/SimpleTable/type'

export const tableColProps = {
    columns: {
        type: Array as PropType<ColumnConfig[]>,
        default: () => []
    }
}
