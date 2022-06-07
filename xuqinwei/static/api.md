##### Table

| 名字               | 描述                 | 类型          | 默认值 |
| ------------------ | :------------------- | ------------- | ------ |
| data               | 数据源               | Column[]      | -      |
| height             | 表格整体高度         | string/number | -      |
| max-heihgt         | 表格最大高度         | string/number | -      |
| border             | 是否带有边框         | boolean       | false  |
| fit                | 列宽是否自动展开     | boolean       | true   |
| show-header        | 是否展示表头         | boolean       | true   |
| row-key            | 行数组key值          | string        | -      |
| default-expand-all | 是否默认展开所有行   | boolean       | false  |
| expand-row-keys    | keys数组内都为展开行 | keys[]        | -      |
| span-method        | 合并方法             | function      | -      |
| default-sort       | 默认排序列           | object        | -      |

Column

| 名字        | 描述                           | 类型                  | 默认值 |
| ----------- | ------------------------------ | --------------------- | ------ |
| type        | 可展示多选框/索引/展开行       | string                | -      |
| index       | 配合type属性，自定义index      | number/function       | -      |
| prop        | 字段名                         | string                | -      |
| width       | 对应的列宽                     | string                | -      |
| min-width   | 最小列宽                       | string                | -      |
| fixed       | 是否为固定列及固定在哪一侧     | boolean/string        | -      |
| sortable    | 是否可以排序                   | boolean               | -      |
| sort-method | 排序方法                       | function              | -      |
| sort-by     | 排序方式                       | string/array/function | -      |
| formatter   | 格式化数据                     | function              | -      |
| align       | 对齐方式                       | string                | left      |
| selectable  | 针对type为索引有效，是否为可选 | boolean               | -      |
| label       | 列名                         | string               | -      |

DEMO
```
import { defineComponent } from "vue";
import { type TableProps, tableProps, ListItemType } from "./types";
import {SiTable} from '@/components/si-table'

export default defineComponent({
  props: tableProps,
  components: {
    SiTable
  },
  setup(prop) {
    let tabledata: TableProps[] = [
      {
        name: '马小跳',
        sex: '男',
        age: '15',
        address: '南山区',
      },
      {
        name: '马小桃',
        sex: '女',
        age: '12',
        address: '龙岗区',
      },
      {
        name: '刘强',
        sex: '男',
        age: '41',
        address: '福田区',
      },
    ]
    return () => {
      return (
        <si-table class="table"
                  data={tabledata}
                  height={500}
                  max-heihgt={800}
                  border={true}
                  fit={true}
                  row-key={'_id'}
                  default-expand-all={true}>
                <si-table-column prop={'name'} label={'姓名'} wdith={180} align={'center'}/>
                <si-table-column prop={'sex'} label={'性别'} wdith={180} />
                <si-table-column prop={'age'} label={'年龄'} wdith={180} />
                <si-table-column prop={'address'} label={'地址'} min-wdith={200} />
        </si-table>
      );
    };
  },
});

```