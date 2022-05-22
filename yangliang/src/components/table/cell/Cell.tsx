import { defineComponent, ExtractPropTypes, onMounted } from "vue";
import { addLog } from "../../../log/log";
import './cell.css';

export const cellProps = {
    component: {
      type: String,
      default: 'td'
    },
    column: {
      type: Object,
      default: {}
    },
    record: {
      type: Object
    },
    sorter: {
        type: Function,
        default: () => {}
    }
  }
  
  export type CellProps = ExtractPropTypes<typeof cellProps>;

export default defineComponent({
    name: "Cell",
    props: cellProps,
    setup(props: CellProps, { attrs, emit, slots }) {
        onMounted(()=>{
            addLog({
              level: "info",
              message: {
                component: "Cell",
                props,
                msg: 'Some One Use Cell Component'
              }
            })
          })
        const Component: any = props.component;
        const cellattrs = {
            class: `${Component}-cell cell`
        }
        return () => {
          return (
            <Component { ...cellattrs }>
              {props.record ? props.record[props.column.dataKey] : props.column.title }
              { 
                  (!props.record && props.column.sorter) && <span class="cell-order">
                      <svg onClick={()=>{
                          props.sorter(props.column.dataKey, true)
                      }} focusable="false" class="asc-order" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024">
                          <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z">
                          </path>
                      </svg>
                      <svg onClick={()=>{
                          props.sorter(props.column.dataKey, false)
                      }} focusable="false" class="desc-order" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024">
                          <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z">
                          </path>
                      </svg>
                  </span>
              }
            </Component>
          );
      };
    },
});