import { defineComponent, onErrorCaptured, computed, reactive, onMounted } from "vue";
import HeaderRow from "./table/headerRow/HeaderRow";
import BodyRow from "./table/bodyRow/BodyRow"
import Pagination from "./pagination/Pagination";
import { Column } from "./types";
import { addLog } from '../log/log';
// import log4js from "log4js";
// log4js.configure({
//   appenders: { cheese: { type: "file", filename: "cheese.log" } },
//   categories: { default: { appenders: ["cheese"], level: "error" } }
// });

// const logger = log4js.getLogger();

type TableProps = {
    columns: Column[];
    dataSource: any[];
    pageSize: number;
    currentPage: number;
    total: number;
    paginationChange: () => {}
}


export default defineComponent({
  name: "SimpleTable",
  props: [
    'columns',
    'dataSource',
    'pageSize',
    'currentPage',
    'total',
    'paginationChange'
  ],
  setup(props: TableProps, { attrs, emit, slots }) {
    
    onMounted(()=>{
      addLog({
        level: "info",
        message: {
          component: "SimpleTable",
          props,
          msg: 'Some One Use SimpleTable Component'
        }
      })
    })

    onErrorCaptured((err) => {
      addLog({
        level: "error",
        message: {
          component: "SimpleTable",
          props,
          msg: err
        }
      })
    })

    let currentSorter = reactive({
            key: '',
            asc: true
          });

    const bodyRows = computed(() =>{ 
        const currentRow = props.dataSource;
        if(currentSorter.key) {
          if(currentSorter.asc){
            currentRow.sort((a,b) => a[currentSorter.key] - b[currentSorter.key]);
          } else {
            currentRow.sort((a,b) => b[currentSorter.key] - a[currentSorter.key]);
          }
        }      
        const rows = currentRow.map((row, i) => <BodyRow columns={props.columns} record={row} key={`${row.key}${i}`} />);
        return rows
       });
    const sorter = (key: string, asc: boolean) => {
      currentSorter.key = key;
      currentSorter.asc = asc;
    }

    return () => {
      return (
        <div>
          <table>
            <thead>
              <HeaderRow columns={props.columns} sorter={sorter} />
            </thead>
            <tbody>
              {bodyRows.value}
            </tbody>
          </table>
          <Pagination total={props.total} current={props.currentPage} change={props.paginationChange} />
        </div>
      );
    };
  },
});
