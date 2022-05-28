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


// vi.fn()  expect wrapper.find findAll toContain 
// trigger('click', new Event())  compositionstart
// promise await setProps setValue  