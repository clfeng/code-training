import { defineComponent } from "vue";
import { type TableProps, tableProps } from "./types";

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    return () => {
      return (
        <table>
          <thead>
            <th>
              <td></td>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>hello table</td>
            </tr>
          </tbody>
        </table>
      );
    };
  },
});
