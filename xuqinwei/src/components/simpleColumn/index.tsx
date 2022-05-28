import { defineComponent } from 'vue'
// import './index.less'

export default defineComponent({
  name: 'simpleColumn',

  emits: ['change'],
  props: {
    prop: {
      type: String,
      default: ''
    },

  },
  setup(props) {
    return null
  },
})
