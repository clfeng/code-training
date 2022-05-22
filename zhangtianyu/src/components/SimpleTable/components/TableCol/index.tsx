import { defineComponent, toRefs } from 'vue'
import { tableColProps } from './type'

export default defineComponent({
    name: 'SimpleTableCol',
    props: tableColProps,
    setup(props, { }) {
        let { columns } = toRefs(props)
        return () => {
            return (
                <colgroup>
                    {
                        columns.value.map(column => <col key={column.key} width={column.width} />)
                    }
                </colgroup>
            )
        }
    },
})