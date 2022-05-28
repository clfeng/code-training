import { defineComponent, onMounted } from "vue";
import './bodyRow.css';
import { Column } from "../../../types";
import Cell from '../../cell/Cell';
import { addLog } from "../../../../log/log";


export interface BodyRowProps {
  columns: Column[];
  record: any;
}


export default defineComponent({
    name: "BodyRow",
    props: [
        'columns',
        'record'
    ],
    setup(props: BodyRowProps, { attrs, emit, slots }) {
      onMounted(()=>{
        addLog({
          level: "info",
          message: {
            component: "BodyRowProps",
            props,
            msg: 'Some One Use BodyRowProps Component'
          }
        })
      })
      const rows = props.columns.map((col, i) => <Cell column={col} record={props.record} key={`${col.dataKey}${i}`} />)
      return () => {
        return (
          <tr>
            { rows }
          </tr>
        );
      };
    },
});