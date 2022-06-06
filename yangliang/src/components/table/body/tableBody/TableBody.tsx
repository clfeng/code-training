
import { computed, defineComponent, onMounted } from "vue";
import './tableBody.css';
import BodyRow from "../bodyRow/BodyRow";
import { addLog } from "../../../../log/log";
import { Column } from "../../../types";

type TableBody = {
    columns: Column[];
    dataSource: any[];
}


export default defineComponent({
    name: "TableBody",
    props: [
        'columns',
        'dataSource'
    ],
    
    setup(props: TableBody, { attrs, emit, slots }) {
      onMounted(()=>{
        addLog({
          level: "info",
          message: {
            component: "TableBody",
            props,
            msg: 'Some One Use TableBody Component'
          }
        })
      })
      
      const bodyRows = computed(() => props.dataSource.map((row, i) => <BodyRow columns={props.columns} record={row} key={`${row.key}${i}`} />));
      return () => {
        return (
          <tbody>
            {bodyRows.value}
          </tbody>
        );
      };
    },
})