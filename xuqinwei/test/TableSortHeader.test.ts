import { shallowMount, mount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import HeaderSort from '../src/components/simpleTable/components/simpleThead/HeaderSort'
test("table header", async () => {
  const onChangeSort = vi.fn()
  const wrapper = shallowMount(HeaderSort, {
    props: {
      column: {
        dataIndex: 3,
        isSort: true,
        label: "年龄",
        order: 2,
        prop: "age",
        sortOrders: { sortOrders: ['normal', 'asc', 'desc'], asc: true, desc: true },
        width: 80
      }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
  await wrapper.find('.table__sort').findAll('span')[1].trigger('click');
  // onChangeSort
});

