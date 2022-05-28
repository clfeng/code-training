import { defineComponent, onMounted } from "vue";
import { addLog } from "../../../log/log";
import './pager.css';

type PagerProps = {
  page: number;
  onClick: (page: number) => void;
  active: boolean;
}

export default defineComponent({
    name: "Pager",
    props: [
      'page',
      'onClick',
      'active'
    ],
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