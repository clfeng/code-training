import { defineComponent, toRefs } from 'vue'
import { dropdownProps, DropdownItem } from './type'
import './style.less'


export default defineComponent({
    name: 'Dropdown',
    props: dropdownProps,
    emits: ['filterChange', 'update:modelValue'],
    setup(props, { emit }) {
        let { data, modelValue } = toRefs(props)
        let onClick = (event: MouseEvent, item: DropdownItem) => {
            event.stopPropagation()
            let newValue = ''
            if (modelValue.value !== item.value) {
                newValue = item.value
            }
            emit('update:modelValue', newValue)
            emit('filterChange', newValue)
        }
        return () => {
            return (
                <section class="dropdown" onClick={(event) => { event.stopPropagation() }} tabindex={-1}>
                    <span class="dropdown__btn iconfont icon-xiangxiajiantou"></span>
                    <ul class="dropdown__list">
                        {
                            data.value.map(item => <li class={{ "dropdown__item": true, 'dropdown__item--active': item.value === modelValue.value }} key={item.value} onClick={(event: MouseEvent) => onClick(event, item)}>{item.value}</li>)
                        }
                    </ul>
                </section >
            )
        }
    },
})