import { defineComponent } from 'vue'
import { columnProps } from 'components/SimpleTable/type'

export default defineComponent({
    name: 'SimpleTableColumn',
    props: columnProps,
    setup() {
        return () => {
            return <div></div>
        }
    },
})