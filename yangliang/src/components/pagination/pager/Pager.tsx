import { defineComponent, onMounted } from "vue";
import { addLog } from "../../../log/log";
import { type PagerProps, pagerProps } from "../../types";
import './pager.css';

export default defineComponent({
    name: "Pager",
    props: pagerProps,
    setup(props: PagerProps, { attrs, emit, slots }) {
      onMounted(()=>{
        addLog({
          level: "info",
          message: {
            component: "Pager",
            props,
            msg: 'Some One Use Pager Component'
          }
        })
      })

      const className = props.active ? 'active' : ''
    
      return () => {
        return (
          <li class = {
            `pager ${props.active ? 'active' : ''}`
          }
          onClick={()=>{
            props.onClick(props.page)
          }}>
              {props.page}
          </li>
        );
      };
    },
});