import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import Mock from "mockjs"
const columns = [
  {
    title: '姓名',
    dataKey: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataKey: 'age',
    key: 'age',
    sorter: true
  },
  {
    title: '住址',
    dataKey: 'address',
    key: 'address',
  },
]

const mock = Mock.mock({
  'dataSource|2': [
    {
      key: '@id',
      name: '@cname',
      age: '@integer(1, 60)',
      address: '@province @city @county',
    }
  ]
})

test("mount component", () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      columns,
      dataSource: mock.dataSource
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
