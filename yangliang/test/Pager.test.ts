import { shallowMount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import Pager from "../src/components/pagination/pager/Pager";
import Mock from "mockjs";

const pagerTestData = Mock.mock({
  'page:1-100': 100,
  'active|1-2': true,
});

test("mount component", () => {
    const wrapper = shallowMount(Pager, {
      props: {
        page: pagerTestData.page,
        active: pagerTestData.active,
        onClick: vi.fn(),
      },
    });
  
    expect(wrapper.html()).toMatchSnapshot();
});


