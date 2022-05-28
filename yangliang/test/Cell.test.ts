import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Cell from "../src/components/table/cell/Cell";

test("mount component", () => {
    const wrapper = shallowMount(Cell, {
      props: {
        column:[
          {
            title: '姓名',
            dataKey: 'name',
            key: 'name',
          }
        ],
        record: {
            name: '张三',
            age: 18,
            address: '深圳市南山区',
        },
        component: 'td',
        sorter: () => {}
      },
    });
  
    expect(wrapper.html()).toMatchSnapshot();
});
  

