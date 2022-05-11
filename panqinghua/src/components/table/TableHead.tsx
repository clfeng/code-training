import { defineComponent } from "vue";
import { type TableHeadProps, tableHeadProps,ColumnType } from "./types";
import classnames from "classnames";
export default defineComponent({
    name: "TableHead",
    props: tableHeadProps,
    emits: ["sort"],
    setup(props: TableHeadProps,{emit}) {
        let sort = (item: ColumnType)=>{
            item.sort = item.sort === 'reversal' ? 'ordinal': 'reversal';
            emit('sort',item);
        }
        let clearSort = () =>{
            props.columns.map(item=>{
                item.sort = 'disorder'
            })
            let item = {
                key:'',
                title:'',
                sort:'disorder'
            }
            sort(item);
        }
        return () => {
            return (
                <>
                    <thead>
                        <a
                        class="pagination-previous"
                        onClick={() => clearSort()}
                        >
                        重置排序
                        </a>
                        <tr>
                            {props.columns.map((item) => {
                                return (
                                    <td>
                                        <div key={item.key}>
                                            <span title={item.title}>
                                                {item.title}
                                            </span>
                                            <span class={classnames("iconfont","icon-shangjiantou", {
                                                  "icon-xiajiantou": item.sort === 'reversal'})}
                                                  onClick={() => sort(item)}
                                                  v-show={item?.isSort}></span>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    </thead>
                </>
            );
        };
    },
});
