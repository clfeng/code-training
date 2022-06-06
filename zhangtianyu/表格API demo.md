### 基础用法（需要实现）

当`simple-table`元素中注入`data`对象数组后，在`simple-table-column`中用`prop`属性来对应对象中的键名即可填入数据，或用默认插槽来自定义。用`label`属性来定义表格的列名，也可以用header插槽自定义。可以使用`width`属性来定义列宽。

1. 基础表格渲染实现
2. 列默认插槽与header插槽实现

```vue
<template>
    <simple-table
      :data="tableData"
      style="width: 100%">
      <simple-table-column
        prop="date"
        label="日期"
        width="180">
        <template v-slot:header="{ column }">
        	<div>{{ column.label }}</div>
      	</template>
      </simple-table-column>
      <simple-table-column
        prop="name"
        label="姓名"
        width="180">
        	<template slot-scope="{row}">
            {{row.name}}
      		</template>
      </simple-table-column>
      <simple-table-column
        prop="address"
        label="地址">
      </simple-table-column>
    </simple-table>
  </template>
```



### 排序表格（需要实现）

在列中设置`sortable`属性即可实现以该列为基准的排序，接受一个`Boolean`，默认为`false`。可以通过 Table 的`default-sort`属性设置默认的排序列和排序顺序。如果需要后端排序，需将`order-type`设置为`custom`，同时在 Table 上监听`sort-change`事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。sort-orders可以配置列的排序轮流方式。order-column-multiple属性可配置是否多列排序。多列排序时，可以配置order-by来决定排序优先级，默认优先级根据列的顺序。

1. 基础排序实现
2. default-sort默认排序实现
3. order-type排序类型实现
4. sort-change事件回调实现
5. sort-orders排序轮流方式实现
6. order-column-multiple多列排序实现
7. order-by排序优先级实现

```vue
<template>
  <simple-table
    :data="tableData"
    style="width: 100%"
    order-column-multiple
    :default-sort = "[{prop: 'date', order: 'desc'}]"
    :order-by = "['name','date']"
    @sort-change="sortChange"
    >
    <simple-table-column
      prop="date"
      label="日期"
      :sort-orders="['asc','desc']"
      sortable
      width="180">
    </simple-table-column>
    <simple-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </simple-table-column>
    <simple-table-column
      prop="address"
      label="地址">
    </simple-table-column>
  </simple-table>
</template>
```



### 筛选表格（需要实现）

在列中设置`filters`属性即可开启该列的筛选，filters 是一个数组，如果需要后端排序，需将`filter-type`设置为`custom`，同时在 Table 上监听`filter-change`事件。filter-column-multiple属性可配置是否多列筛选。

1. 基础筛选实现
2. filter-type筛选类型实现
3. filter-change事件回调实现
4. filter-column-multiple多列筛选实现

```vue
<template>
  <simple-table
    :data="tableData"
    filter-column-multiple
    :filter-type="custom"
    style="width: 100%"
    @filter-change="filterChange">
    <simple-table-column
      prop="date"
      label="日期"
      width="180"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}]"
    >
    </simple-table-column>
    <simple-table-column
      prop="name"
      label="姓名"
      width="180">
    </simple-table-column>
    <simple-table-column
      prop="address"
      label="地址">
    </simple-table-column>
    <simple-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]">
      <template slot-scope="scope">
        <span
          :type="scope.row.tag === '家' ? 'primary' : 'success'">{{scope.row.tag}}</span>
      </template>
    </simple-table-column>
  </simple-table>
</template>
```



### 添加分页（需要实现）

`current-page`为当前页数。配置总条目数total 和 一页显示条目数 page-size 来配置页码。默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过`pager-count`属性可以设置最大页码按钮数。

1. 分页功能实现

```vue
<template>
    <simple-table
      :data="tableData"
			:pager-count="7"
			:current-page="1"
			:total="100"
			:page-size="20"
      style="width: 100%">
      <simple-table-column
        prop="date"
        label="日期"
        width="180">
      </simple-table-column>
      <simple-table-column
        prop="name"
        label="姓名"
        width="180">
        	<template slot-scope="{row}">
            {{row.name}}
      		</template>
      </simple-table-column>
      <simple-table-column
        prop="address"
        label="地址">
      </simple-table-column>
    </simple-table>
  </template>
```





### 固定表头（需要实现）

只要在`simple-table`元素中定义了`height`属性，即可实现固定表头的表格，而不需要额外的代码。

1. 固定表头样式实现

```vue
<template>
  <simple-table
    :data="tableData"
    height="250"
    style="width: 100%">
    <simple-table-column
      prop="date"
      label="日期"
      width="180">
    </simple-table-column>
    <simple-table-column
      prop="name"
      label="姓名"
      width="180">
    </simple-table-column>
    <simple-table-column
      prop="address"
      label="地址">
    </simple-table-column>
  </simple-table>
</template>
```



### 固定列

固定列需要使用`fixed`属性，它接受 Boolean 值或者`left``right`，表示左边固定还是右边固定。

```vue
<template>
  <simple-table
    :data="tableData"
    style="width: 100%">
    <simple-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </simple-table-column>
    <simple-table-column
      prop="name"
      label="姓名"
      width="120">
    </simple-table-column>
    <simple-table-column
      prop="province"
      label="省份"
      width="120">
    </simple-table-column>
    <simple-table-column
      prop="zip"
      label="邮编"
      width="120">
    </simple-table-column>
    <simple-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <button @click="handleClick(scope.row)" type="text" size="small">查看</button>
      </template>
    </simple-table-column>
  </simple-table>
</template>
```



### 多级表头

只需要在 simple-table-column 里面嵌套 simple-table-column，就可以实现多级表头。

```vue
<template>
  <simple-table
    :data="tableData"
    style="width: 100%">
    <simple-table-column
      prop="date"
      label="日期"
      width="150">
    </simple-table-column>
    <simple-table-column label="配送信息">
      <simple-table-column
        prop="name"
        label="姓名"
        width="120">
      </simple-table-column>
      <simple-table-column label="地址">
        <simple-table-column
          prop="province"
          label="省份"
          width="120">
        </simple-table-column>
        <simple-table-column
          prop="city"
          label="市区"
          width="120">
        </simple-table-column>
        <simple-table-column
          prop="address"
          label="地址"
          width="300">
        </simple-table-column>
        <simple-table-column
          prop="zip"
          label="邮编"
          width="120">
        </simple-table-column>
      </simple-table-column>
    </simple-table-column>
  </simple-table>
</template>
```



### 多选表格

实现多选非常简单: 手动添加一个`simple-table-column`，设`type`属性为`checkbox`即可

```vue
<template>
  <simple-table
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <simple-table-column
      type="selection"
      width="55">
    </simple-table-column>
    <simple-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </simple-table-column>
    <simple-table-column
      prop="name"
      label="姓名"
      width="120">
    </simple-table-column>
    <simple-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </simple-table-column>
  </simple-table>
</template>
```

