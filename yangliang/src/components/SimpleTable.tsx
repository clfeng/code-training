import { defineComponent, onErrorCaptured, computed, reactive, onMounted } from "vue";
import TableHeader from "./table/tableHeader/tableHeader";
import TableBody from "./table/TableBody/TableBody"
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

    const getSortedDataSource = computed(() =>{ 
      const currentDataSource = props.dataSource;
      if(currentSorter.key) {
        if(currentSorter.asc){
          currentDataSource.sort((a,b) => a[currentSorter.key] - b[currentSorter.key]);
        } else {
          currentDataSource.sort((a,b) => b[currentSorter.key] - a[currentSorter.key]);
        }
      }      
      return currentDataSource;
    });
    const sorter = (key: string, asc: boolean) => {
      currentSorter.key = key;
      currentSorter.asc = asc;
    }

    return () => {
      return (
        <div>
          <table>
            <TableHeader columns={props.columns} sorter={sorter} />
            <TableBody columns={props.columns}  dataSource={getSortedDataSource.value} />
          </table>
          <Pagination total={props.total} current={props.currentPage} onChange={props.paginationChange} />
        </div>
      );
    };
  },
});
