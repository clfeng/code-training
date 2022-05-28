import { defineComponent } from 'vue'
// import './index.less'

export default defineComponent({
  name: 'simpleThead',

  emits: ['change'],
  props: {
    dataColumns: {
      type: Array,
      default: []
    },

  },
  setup(props) {
    return () => {
      return <tr class="head-tr">
        {
          props.dataColumns.map(item => {
            return <th class="head-th">
              {item.label}
              {/* 暂未做排序功能 */}
              {/* {
                item.isSort && <i onClick={() => { headClick(item.prop) }}>^</i>
              } */}
            </th>
          })
        }
      </tr>
    }
  },
})
