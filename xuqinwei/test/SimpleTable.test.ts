import { mount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import { ref } from 'vue'

// import SiPagination from '../src/components/simplePagination';
import SimpleColumn from '../src/components/simpleTable/components/simpleColumn';
import SimpleTable from '../src/components/simpleTable';

import { list } from './mockData'
async function validaSort(column, order) {
  if (order === 'asc') {
    //升序按钮是否激活
    expect(column.find('.asc').classes()).toContain('active')
    //降序按钮是否没激活
    expect(column.find('.desc').classes()).not.toContain('active')
  } else if (order === 'desc') {
    //降序按钮是否激活
    expect(column.find('.desc').classes()).toContain('active')
    //升序按钮是否没激活
    expect(column.find('.asc').classes()).not.toContain('active')
  } else if (order === 'normal') {
    //升序、降序按钮都没激活
    expect(column.find('.desc').classes()).not.toContain('active')
    expect(column.find('.asc').classes()).not.toContain('active')
  }
}

//默认表格
test("mount component", async () => {
  const getList = vi.fn()
  const onCurrentChange = vi.fn()
  const onSortChange = vi.fn()
  const wrapper = mount({
    template: `
    <simple-table data={dataSource.value}
                  row-key="id"
                  default-sort={[{ prop: 'role', order: 'asc' }]}
                  order-type={false} >
      <simple-column prop="name" label="姓名" />
      <simple-column prop="sex" label="性别" />
      <simple-column prop="age" label="年龄" order={'desc'} isSort={true} sortOrders={['normal', 'asc', 'desc']} />
      <simple-column prop="address" label="地址" width={200} />
    </simple-table>
    `,
    components: {
      'simple-table': SimpleTable,
      'simple-column': SimpleColumn,
    },
    setup(props, { attrs, emit, slots }) {
      let dataSource = ref<unknown[]>(list);

      return { dataSource }
    }
  });

  expect(wrapper.html()).toMatchSnapshot();

});

// 表格-排序
test("sortable table", async () => {
  let sortCallBack = vi.fn()
  const wrapper = mount({
    template: `
    <simple-table data={dataSource.value}
                  pagination={pagination.value}
                  onChange={getList}
                  row-key="id"
                  default-sort={[{ prop: 'role', order: 'asc' }]}
                  order-type={false} >
      <simple-column prop="name" label="姓名" />
      <simple-column prop="sex" label="性别" />
      <simple-column prop="age" label="年龄" order={'desc'} isSort={true} sortOrders={['normal', 'asc', 'desc']} />
      <simple-column prop="address" label="地址" width={200} />
    </simple-table>
    `,
    components: {
      'simple-table': SimpleTable,
      'simple-column': SimpleColumn,
    },
    setip() {
      let dataSource = ref<unknown[]>(list);
      return { dataSource }
    }
  });

  expect(wrapper.html()).toMatchSnapshot();
  let ageColumn = wrapper.find('.head-tr').findAll('head-th')[3]
  await validaSort(ageColumn, 'age')
});

//表格-分页
test("pagination table", async () => {
  const onCurrentChange = vi.fn()
  const wrapper = mount({
    template: `
    <simple-table data={dataSource.value}
                  pagination={pagination.value}
                  onChange={getList}
                  row-key="id"
                  default-sort={[{ prop: 'role', order: 'asc' }]}
                  order-type={false} >
      <simple-column prop="name" label="姓名" />
      <simple-column prop="sex" label="性别" />
      <simple-column prop="age" label="年龄" order={'desc'} isSort={true} sortOrders={['normal', 'asc', 'desc']} />
      <simple-column prop="address" label="地址" width={200} />
    </simple-table>
    `,
    components: {
      'simple-table': SimpleTable,
      'simple-column': SimpleColumn,
    },
    setip() {
      let dataSource = ref<unknown[]>(list);
      return { dataSource }
    }
  });

  expect(wrapper.html()).toMatchSnapshot();

  let page = wrapper.find('.si-pagination')
  let pager = page.findAll('si-pagination__item')

  //上一页
  await page.find('.pre-btn').trigger('click')
  expect(onCurrentChange).toBeCalledWith(1)
  //手动修改
  await wrapper.setProps({
    current: 1
  })
  // 检查第一页状态
  expect(pager[0].classes()).toContain('active')

  //点击第4页
  await pager[4].trigger('click')
  expect(onCurrentChange).toBeCalledWith(4)
  //手动修改
  await wrapper.setProps({
    current: 5
  })
  //第4页是否激活
  expect(pager[4].classes()).toContain('active')

  // 跳转到第3页
  page.find('.si-pagination__input').setValue(3)
  await page.find('.si-pagination__input').trigger("blur")
  expect(onCurrentChange).toBeCalledWith(3)
});