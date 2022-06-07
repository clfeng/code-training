import { computed, defineComponent, ref, toRefs } from 'vue'
import './index.less'

export default defineComponent({
  name: 'SimplePagination',

  emits: ['change'],
  props: {
    current: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 50,
    },
  },
  setup(props, { emit }) {
    // props需要传入总条数、每页的条数、当前页
    const { current, pageSize, total } = toRefs(props)
    const jumperPagerNum = ref<number>()
    const range = computed(() => {
      return Math.max(Math.floor(total.value / pageSize.value), 1)
    })

    function handleInputChange() {
      const num = Number(jumperPagerNum.value)
      let next = isNaN(num) ? current.value : num

      next = Math.max(Math.min(range.value, next), 1)
      emit('change', next, pageSize.value)
    }
    function handlePrevClick() {
      if (current.value === 1) return
      emit('change', current.value - 1, pageSize.value)
    }
    function handleNextClick() {
      if (current.value === range.value) return

      emit('change', current.value + 1)
    }

    function handleClickChange(num) {
      if (num !== current.value) emit("change", num, pageSize.value);
    };
    return () => {
      return (
        <ul class="si-pagination">
          <li class="si-pagination__item" onClick={() => { handlePrevClick() }}>{'<'}</li>
          {Array.from({ length: range.value }, (_, i) => {
            return <li class="si-pagination__item" onClick={() => { handleClickChange(i + 1) }}>{i + 1}</li>
          })}
          <li class="si-pagination__item" onClick={() => { handleNextClick() }}>
            {'>'}
          </li>
          <div>
            <span>跳至</span>
            <input
              class="si-pagination__input"
              v-model={jumperPagerNum.value}
              onChange={() => { handleInputChange() }}
            />
            <span>页</span>
          </div>
        </ul>
      )
    }
  },
})
