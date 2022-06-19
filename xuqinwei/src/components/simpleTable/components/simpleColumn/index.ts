import { defineComponent } from 'vue'

export default defineComponent({
  name: 'simpleColumn',

  props: {
    prop: {
      type: String,
      default: ''
    },

  },
  setup() {
    return () => {
      return null
    }
  },
})
