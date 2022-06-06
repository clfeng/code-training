import { defineComponent, onMounted } from "vue";
import './tableHeader.css';
import HeaderRow from "../headerRow/HeaderRow";
import { HeaderRowProps } from '../headerRow/HeaderRow'
import { addLog } from "../../../log/log";


export default defineComponent({
    name: "TableHeader",
    props: [
        'columns',
        'sorter'
    ],
    setup(props: HeaderRowProps, { attrs, emit, slots }) {
      onMounted(()=>{
        addLog({
          level: "info",
          message: {
            component: "TableHeader",
            props,
            msg: 'Some One Use TableHeader Component'
          }
        })
      })
      return () => {
        return (
          <thead>
            <HeaderRow columns={props.columns} sorter={props.sorter} />
          </thead>
        );
      };
    },
})