import { shallowMount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import simpleColgroup from "../src/components/simpleTable/components/simpleColgroup";


test("mount component", () => {
  const wrapper = shallowMount(simpleColgroup, {
    props: {
      dataColumns: []
    }
  }
  );

  expect(wrapper.html()).toMatchSnapshot();
});

