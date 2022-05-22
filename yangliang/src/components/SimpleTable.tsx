import { defineComponent, ref, computed, reactive, onMounted } from "vue";
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
}


export default defineComponent({
  name: "SimpleTable",
  props: [
    'columns',
    'dataSource'
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


      // 监听错误日志  
      window.addEventListener('error', (err) => {
        addLog({ level: "error", message:{
          component: "SimpleTable",
          props,
          err: err
        }})

        // 错误捕获时应立即将错误上传至服务器并通知相关技术人员
        // axios({
        //   url: '日志服务器',
        //   data: err
        // })
      })
    })

    // 监听promise报错日志
    window.addEventListener('unhandledrejection', (err) => {
      addLog({ level: "error", message:{
        component: "SimpleTable",
        props,
        promiseErr: err
      }})
      // 错误捕获时应立即将错误上传至服务器并通知相关技术人员
        // axios({
        //   url: '日志服务器',
        //   data: err
        // })
    })

    const paginationClick = (page:number) => {
      currentPage.value = page;
    }
    const currentPage = ref(1),
          pageSize = ref(10);
    let currentSorter = reactive({
            key: '',
            asc: true
          });

    const bodyRows = computed(() =>{ 
        const start = (currentPage.value - 1) * pageSize.value, 
              end = currentPage.value * pageSize.value,
              currentRow = props.dataSource.slice(start, end);
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
          <Pagination total={props.dataSource.length} current={currentPage.value} change={paginationClick} />
        </div>
      );
    };
  },
});
