import { shallowMount, mount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import simpleThead from '../src/components/simpleTable/components/simpleThead'
// import { columns } from './mockData'
let columns = [
  {
    dataIndex: 1,
    isSort: false,
    label: "姓名",
    order: false,
    prop: "name",
    sortOrders: [],
    width: 80
  },
  {
    dataIndex: 2,
    isSort: false,
    label: "性别",
    order: [],
    prop: "name",
    sortOrders: [],
    width: 80
  },
  {
    dataIndex: 3,
    isSort: true,
    label: "年龄",
    order: false,
    prop: "name",
    sortOrders: ['normal', 'asc', 'desc'],
    width: 80
  },
  {
    dataIndex: 4,
    isSort: false,
    label: "地址",
    order: false,
    prop: "name",
    sortOrders: [],
    width: 200
  },
]
test("table header", async () => {
  const headClick = vi.fn()
  const wrapper = shallowMount(simpleThead, {
    props: {
      dataColumns: columns
    },
    setup() {
      return {
        // headClick
      }
    }
  });
  expect(wrapper.html()).toMatchSnapshot();
  await wrapper.find('.head-tr').findAll('.head-th')[3].trigger('click');
});

