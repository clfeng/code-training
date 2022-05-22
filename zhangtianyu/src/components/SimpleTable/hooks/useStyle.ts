import { toRefs, computed } from 'vue'
import { TableProps } from '../type'

export default function useStyle(props: TableProps) {
    let { height } = toRefs(props)
    let tableHeight = computed(() => {
        if (isNaN(height.value)) {
            return height.value
        }
        return height.value + 'px'
    })

    let tableStyle = computed(() => {
        return {
            height: tableHeight.value
        }
    })
    return {
        tableStyle
    }
}