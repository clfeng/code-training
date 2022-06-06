### 表格参数（SimpleTable）

| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 参数&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;                                                                       &nbsp; 说明 | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 类型 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 可选值&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 默认值&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| data                                                         | 显示的数据                                                   | array                                                        | -                                                            | []                                                           |
| height                                                       | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，可以固定表头 | string/number                                                | -                                                            | ''                                                           |
| show-header                                                  | 是否显示表头                                                 | boolean                                                      | -                                                            | true                                                         |
| row-key                                                      | 行数据的 Key                                                 | string                                                       | -                                                            | ''                                                           |
| empty-text                                                   | 空数据时显示的文本内容                                       | string                                                       | -                                                            | 暂无数据                                                     |
| loading                                                      | 数据是否正在加载                                             | boolean                                                      | -                                                            | false                                                        |
| loading-text                                                 | 数据加载文本                                                 | string                                                       | -                                                            | 加载中                                                       |
| default-sort                                                 | 默认的排序列的 prop 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序,order-column-multiple为true时，可接收数组 | array/object                                                 | order：asec、desc、normal prop:列的prop                      | -                                                            |
| order-type                                                   | 表格排序类型，如果设置为 'custom'，则代表用户希望远程排序或自定义排序，需要监听 表格 的 sort-change 事件 | boolean/string                                               | false,true, custom                                           | false                                                        |
| order-column-multiple                                        | 是否支持多列排序                                             | boolean                                                      | -                                                            | false                                                        |
| order-by                                                     | 多列排序时有效，排序列的优先级，默认根据列的排序             | array                                                        | prop                                                         | -                                                            |
| filter-type                                                  | 数据过滤的类型、如果设置为 'custom'，则代表用户希望远程筛选或自定义筛选，需要监听 表格 的 filter-change 事件 | boolean, string                                              | false,true,custom                                            | false                                                        |
| filter-column-multiple                                       | 是否支持多列筛选                                             | boolean                                                      | -                                                            | false                                                        |
| show-summary                                                 | 是否在表尾显示合计行                                         | boolean                                                      | -                                                            | false                                                        |
| drag                                                         | 表格行是否可以拖拽                                           | boolean                                                      | -                                                            | false                                                        |
| resizable                                                    | 表格列是否可以拖拽调整宽度                                   | boolean                                                      | -                                                            | false                                                        |
| filter-columns                                               | 显示的列prop                                                 | array                                                        | prop:列的prop                                                | -                                                            |
| page-size                                                    | 每页显示条目个数                                             | number                                                       | -                                                            | 20                                                           |
| total                                                        | 总条目数                                                     | number                                                       | -                                                            | -                                                            |
|                                                              |                                                              |                                                              |                                                              |                                                              |
| pager-count                                                  | 页码按钮的数量                                               | number                                                       | -                                                            | 7                                                            |
| current-page                                                 | 当前页数                                                     | number                                                       | -                                                            | 1                                                            |
| page-fixed                                                   | 分页是否固定                                                 | boolean                                                      | -                                                            | false                                                        |



### 表格事件

| 事件名           | 说明                                       | 参数                                                         |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------ |
| select-all       | 取消或全选按钮时触发                       | selection:选中的行信息                                       |
| selection-change | 当选择项发生变化时会触发该事件             | selection:选中的行信息                                       |
| sort-change      | 当表格的排序条件发生变化的时候会触发该事件 | { prop:当前列prop, order:当前排序方式 }                      |
| filter-change    | 当表格的筛选条件发生变化的时候会触发该事件 | { prop:当前列prop, filter:当前过滤数据 }                     |
| header-dragend   | 当拖动表头改变了列的宽度的时候会触发该事件 | {prop:当前列prop,width:当前宽度,oldWidth:旧宽度}             |
| expand-change    | 对某一行展开或者关闭的时候会触发该事件     | row:行信息                                                   |
| summary-method   | 自定义的合计计算方法                       | Function({ columns:列信息, data:表格数据 })                  |
| span-method      | 合并行或列的计算方法                       | Function({ row:行信息, column:列信息, rowIndex:行索引, columnIndex:列索引 }) |
| size-change      | page-size 改变时会触发                     | pageSize:每页显示条数                                        |
| current-change   | current-change改变时触发                   | currentChange:当前页数                                       |



### 表格方法

| 方法名             | 说明                                                         | 参数                                   |
| ------------------ | ------------------------------------------------------------ | -------------------------------------- |
| clearSelection     | 清空单选或多选数据                                           | -                                      |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row:行信息, selected:是否选中          |
| toggleRowExpansion | 切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开） | row:行信息, expanded:是否展开          |
| clearSort          | 用于清空排序条件，数据会恢复成未排序的状态                   | -                                      |
| clearFilter        | 用于清空所有过滤条件，数据会恢复成未过滤的状态               | -                                      |
| sort               | 手动对 Table 进行排序。参数`prop`属性指定排序列，`order`指定排序顺序。多列排序时，可传数组 | prop: string, order: normal、asc、desc |



### 表格插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| empty   | 自定义空信息 |
| default | 列信息       |



### 表格列属性（SimpleTableColumn）

| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 参数&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;                                                                       &nbsp; 说明 | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 类型 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 可选值&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 默认值&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |
| :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| type                                                         | 列的类型，如果设置checkbox为多选框，radio为单选框,expand为扩展按钮 | string                                                       | checkbox/radio/expand                                        | -                                                            |
| label                                                        | 显示的标题                                                   | string                                                       | -                                                            | -                                                            |
| prop                                                         | 对应列内容的字段名                                           | string                                                       | -                                                            | -                                                            |
| width                                                        | 对应列的宽度                                                 | string                                                       | -                                                            | -                                                            |
| min-width                                                    | 对应列的最小宽度                                             | string                                                       | -                                                            | -                                                            |
| fixed                                                        | 列是否固定在左侧或者右侧，true 表示固定在左侧                | string/boolean                                               | true,false,left,right                                        | -                                                            |
| sortable                                                     | 对应列是否可以排序                                           | boolean                                                      | true, false                                                  | false                                                        |
| sort-orders                                                  | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable存在时有效。需传入一个数组 | array                                                        | asc、desc、normal                                            | [normal、asc、desc]                                          |
| resizable                                                    | 对应列是否可以通过拖动改变宽度                               | boolean                                                      | -                                                            | false                                                        |
| show-overflow-tooltip                                        | 当内容过长被隐藏时显示 tooltip                               | boolean                                                      | -                                                            | false                                                        |
| align                                                        | 对齐方式                                                     | string                                                       | left/center/right                                            | left                                                         |
| header-align                                                 | 表头对齐方式，若不设置该项，则使用表格的对齐方式             | string                                                       | left/center/right                                            | -                                                            |
| filters                                                      | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性 | array                                                        | -                                                            | -                                                            |
| filter-multiple                                              | 数据过滤的选项是否多选                                       | boolean                                                      | -                                                            | false                                                        |



### 表格列事件

| 事件名     | 说明                                                         | 参数                       |
| ---------- | ------------------------------------------------------------ | -------------------------- |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 是否可以选中 | {row:行信息, index:行索引} |



### 表格列插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 自定义列内容 |
| header  | 自定义列标题 |

