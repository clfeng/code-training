import { defineComponent, toRefs } from 'vue'

import { ColumnSortOrder } from '@/types/table'

export default defineComponent({
  name: 'SimpleTableHeaderCell',
  emits: ['sort'],
  props: {
    column: {
      type: Object,
      default: {}
    }
  },
  setup(props, { emit }) {
    let { column } = toRefs(props)

    let onChangeSort = (event: MouseEvent, order) => {
      event.stopPropagation()
      console.log('column.value', column.value);

      emit('sort', column, order)
    }
    return () => {
      return (
        <div class="table__sort">
          {
            /* 升序按钮 */
            column.value.sortOrders?.asc && <span class="asc" onClick={(event: MouseEvent) => onChangeSort(event, ColumnSortOrder.asc)}></span>
          }
          {
            /* 降序按钮 */
            column.value.sortOrders?.desc && <span class="desc" onClick={(event: MouseEvent) => onChangeSort(event, ColumnSortOrder.desc)}></span>
          }
        </div>
      )
    }
  },
})