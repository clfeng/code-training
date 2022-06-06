import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import { columns, mock } from './testData';

test("basic work", () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      columns,
      dataSource: mock.dataSource
    },
  });

  expect(wrapper.html()).toMatchSnapshot();

  expect(wrapper.find('ul').findAll('li')[1].classes()).toContain('disabled');
  expect(wrapper.find('ul').findAll('li')[2].classes()).toContain('active');

});


test("pagination work", async () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      columns,
      dataSource: mock.dataSource
    },
  });

  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.find('ul').findAll('li')[3].trigger('click');

  expect(wrapper.find('ul').findAll('li')[1].classes()).not.toContain('disabled');
  expect(wrapper.find('ul').findAll('li')[3].classes()).toContain('active');

});


test("quick-jumper work", async () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      columns,
      dataSource: mock.dataSource
    },
  });

  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.setProps({ currentPage: 5 });

  expect(wrapper.find('ul').findAll('li')[1].classes()).not.toContain('disabled');
  expect(wrapper.find('ul').findAll('li')[6].classes()).toContain('active');

});


test("order work", async () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      columns,
      dataSource: mock.dataSource
    },
  });

  expect(wrapper.html()).toMatchSnapshot();

  expect(wrapper.find('thead').find('tr').findAll('th')[2].find('span').classes()).toContain('cell-order');
  await wrapper.find('thead').find('tr').findAll('th')[2].find('span').findAll('svg')[1].trigger('click');

});





// vi.fn()  expect wrapper.find findAll toContain 
// trigger('click', new Event())  compositionstart
// promise await setProps setValue  