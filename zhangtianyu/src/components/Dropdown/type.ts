
import { PropType } from 'vue'

export interface DropdownItem {
    text: string,
    value: any
}

export const dropdownProps = {
    data: {
        type: Array as PropType<DropdownItem[]>,
        default: []
    },
    modelValue: {
        default: ''
    }
}