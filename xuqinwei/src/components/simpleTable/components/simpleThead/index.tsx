import { defineComponent } from 'vue'
import './index.less'

import HeaderSort from './HeaderSort'

export default defineComponent({
  name: 'simpleThead',

  emits: ['sort'],
  components: {
    HeaderSort
  },
  props: {
    dataColumns: {
      type: Array,
      default: []
    },
  },
  setup(props, { emit }) {
    function headClick(prop, order) {
      emit('sort', prop, order)

    }
    return () => {
      return <tr class="head-tr">
        {
          props.dataColumns.map(item => {
            return <th class="head-th">
              {item.label}
              {
                item.isSort && <header-sort column={item} onSort={headClick} />
              }
            </th>
          })
        }
      </tr>
    }
  },
})
