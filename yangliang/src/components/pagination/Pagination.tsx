import { defineComponent, ref, computed, onMounted, onErrorCaptured } from "vue";
import { addLog } from "../../log/log";
import { type PaginationProps, paginationProps } from "../types";
import Pager from './pager/Pager';
import './pagination.css';

export default defineComponent({
    name: "Pagination",
    props: paginationProps,
    setup(props: PaginationProps, { attrs, emit, slots }) {
      onMounted(()=>{
        addLog({
          level: "info",
          message: {
            component: "Pagination",
            props,
            msg: 'Some One Use Pagination Component'
          }
        })
      })

      onErrorCaptured((err) => {
        addLog({
          level: "error",
          message: {
            component: "Pagination",
            props,
            msg: err
          }
        })
      })
      const currentPage = ref(props.current);
      const pageCount = ref(Math.ceil(props.total / props.pageSize));
      const pagesList = computed(() => {
      const tempPageList = [];
        for (let i = 0; i < pageCount.value; i++) {
          tempPageList.push(<Pager key={i + 1} 
                                   page={i + 1}
                                   onClick={(page:number) => {
                                      emit('change', page);
                                      currentPage.value = page;
                                   }}
                                   active={currentPage.value === i + 1} />);
        }
        return tempPageList
      });
      const preClick = () => {
        if(currentPage.value > 1){
          currentPage.value -= 1;
          emit('change', currentPage.value);
        }
      }
      const nextClick = () => {
        if(currentPage.value < pageCount.value){
          currentPage.value += 1;
          emit('change', currentPage.value);
        }
      }
      const preDisabled = computed(() => {
        return currentPage.value === 1 ? 'disabled' : '';
      })
      const nextDisabled = computed(() => {
        return currentPage.value === pageCount.value ? 'disabled' : '';
      })
      let timer: any = null;
      
      const showSizeChange = (e: Event) => {
        timer = setTimeout(() => {
          if(typeof timer === 'number'){
            clearTimeout(timer)
            const page = (e.target as any)?.value;
            if(typeof page !== 'number' && page >= 1 && page <= pageCount.value) {
              currentPage.value = page;
              emit('change', currentPage.value);
            }
          }
        },300);
      }
        
      return () => {
        return (
          <ul>
            <li class={`pager ${preDisabled.value}`} 
                onClick={preClick}
            >
              <svg focusable="false" class="pre" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
                </path>
              </svg>
            </li>
            {
              pagesList.value.map(pager => pager)
            }
            <li class={`pager ${nextDisabled.value}`}
                onClick={nextClick}>
                <svg focusable="false" class="next" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z">
                  </path>
                </svg>
            </li>
            {
              props.showSizeChanger && 
              <div class="show-quick-jumper">
                跳至<input type="text" onInput={showSizeChange} />页
              </div>
            }
          </ul>
        );
      };
    },
});