import { shallowMount, mount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import Pagination from "../src/components/simplePagination/index";


test("mount component", () => {
  const handleInputChange = vi.fn()
  const wrapper = shallowMount(Pagination, {
    props: {
      current: 1,
      pageSize: 10,
      total: 47,
    },
    // setup(props, { attrs, emit, slots }) {

    // return { handleInputChange }
    // }
  });

  expect(wrapper.html()).toMatchSnapshot();
});