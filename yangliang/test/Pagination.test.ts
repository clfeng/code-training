import { shallowMount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import Pagination from "../src/components/Pagination/Pagination";


test("mount component", () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChange: vi.fn(),
        showQuickJumper: false,
        onChange: vi.fn(), 
      },
    });
  
    expect(wrapper.html()).toMatchSnapshot();
});

