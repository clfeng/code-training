import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";

import SiPagination from '../src/components/simplePagination';
import SimpleTable from '@/components/simpleTable';

test("mount component", () => {
  const wrapper = mount(SimpleTable, {
    props: {
      data: [
        {
          name: 'xa',
          sex: '男',
          age: '12',
          address: '龙华区'
        }
      ],
      pagination: {
        total: 10,
        pageSize: 10,
        current: 1
      },
      columns: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'age',
          label: '年龄',
          isSort: true
        },
        {
          prop: 'address',
          label: '地址'
        }
      ]
    },
    template: `
    <div>
      <table class="table">
        <colgroup>
          {/* 计算列宽 */}
        </colgroup>
        <thead >
          {/* 表头组件 */}
          <si-thead dataColumns={props.columns}></si-thead>
        </thead>
        <tbody id="tbody">
          {
            props.data.map((item: ListItemType) => {
              return <tr class="body-tr">
                {
                  props.columns.map(head => {
                    return <td class="body-td">{item[head.prop]}</td>
                  })
                }

              </tr>
            })
          }
        </tbody>
      </table>
      <div class="si-table__footer" >
        <slot name="title"></slot>
      </div>
      <si-pagination total={props.pagination?.total}
        pageSize={props.pagination?.pageSize}
        current={props.pagination?.current}
        onChange={handlePaginationChange}></si-pagination>
    </div>
    `,
    components: {
      'si-pagination': SiPagination,
    },

    setup(props, { attrs, emit, slots }) {
      function headClick(prop) {
        // isSort = !isSort
        // 排序
        console.trace('暂未提供排序功能')
      }

      function handlePaginationChange(current: Number) {
        // 暂时只做了页数切换，每页的条数未做
        emit('change', current)
      }
    }
  });

  expect(wrapper.html()).toMatchSnapshot();
});
