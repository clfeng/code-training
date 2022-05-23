import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Pagination from "../src/components/Pagination/Pagination";

test("mount component", () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        current: 1,
        disabled: false,
        hideOnSinglePage: false,
        defaultPageSize: 10,
        pageSize: 10,
        showTotal: false,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30],
        showSizeChange: () => {},
        showQuickJumper: false,
        change: () => {}, 
        showPre: true,
        showNext: true
      },
    });
  
    expect(wrapper.html()).toMatchSnapshot();
  });