import { defineComponent } from 'vue'

export default defineComponent({
  name: 'simpleColgroup',
  props: {
    dataColumns: {
      type: Array,
      default: []
    },

  },
  setup(props) {
    return () => {
      return (
        <colgroup>
          {
            props.dataColumns.map(column => <col key={column.label} width={column.width || 40} />)
          }
        </colgroup>
      )
    }
  },
})
