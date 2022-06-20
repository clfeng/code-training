import { shallowMount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import SimpleColumn from "../src/components/simpleTable/components/simpleColumn";


test("Table column", () => {
  const wrapper = shallowMount(SimpleColumn, {
    props: {
      prop: {}
    }
  }
  );

  expect(wrapper.html()).toMatchSnapshot();
});

