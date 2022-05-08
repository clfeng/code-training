import { defineComponent } from "vue";
import { type TableProps, tableProps } from "./types";
import './index.less'

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    let isSort = false
    const headList = [
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
    const bodyList = [
      {
        name: '小何',
        sex: '女',
        age: '28',
        address: '深圳市南山区'
      },
      {
        name: '小熊',
        sex: '女',
        age: '12',
        address: '深圳市南山区'
      },
      {
        name: '小爱',
        sex: '女',
        age: '14',
        address: '深圳市南山区'
      },
      {
        name: '小何',
        sex: '男',
        age: '55',
        address: '深圳市南山区'
      },
      {
        name: '小妍',
        sex: '女',
        age: '34',
        address: '深圳市南山区'
      },
      {
        name: '小何',
        sex: '男',
        age: '27',
        address: '深圳市南山区'
      },
      {
        name: '小山',
        sex: '男',
        age: '18',
        address: '深圳市南山区'
      },
      {
        name: '小拉',
        sex: '男',
        age: '12',
        address: '深圳市南山区'
      },
      {
        name: '小鹅',
        sex: '女',
        age: '48',
        address: '深圳市南山区'
      },
      {
        name: '小欧',
        sex: '男',
        age: '33',
        address: '深圳市南山区'
      },
    ]
    function headClick(prop) {
      isSort = !isSort
      sort(prop, isSort ? '' : 'asc')
    }

    function sort(type, order) {
      let table = document.getElementById("tbody");
      let trArr = table?.children;
      let intType;
      if (type == "age") {
        intType = 2;
      }
      let temp
      if (order == "asc") {
        for (let i = 0; i < trArr.length - 1; i++) {
          for (let j = 0; j < trArr.length - i - 1; j++) {
            if ((trArr[j].children[intType].innerHTML - 0) > (trArr[j + 1].children[intType].innerHTML - 0)) {
              temp = trArr[j].innerHTML;
              trArr[j].innerHTML = trArr[j + 1].innerHTML;
              trArr[j + 1].innerHTML = temp;
            }
          }
        }
      } else {
        for (let i = 0; i < trArr.length - 1; i++) {
          for (let j = 0; j < trArr.length - i - 1; j++) {
            if ((trArr[j].children[intType].innerHTML - 0) < (trArr[j + 1].children[intType].innerHTML - 0)) {
              temp = trArr[j].innerHTML;
              trArr[j].innerHTML = trArr[j + 1].innerHTML;
              trArr[j + 1].innerHTML = temp;
            }
          }
        }
      }
    }
    return () => {
      return (
        <table class="table">
          <thead >
            <tr class="head-tr">
              {
                headList.map(item => {
                  return <th class="head-th">
                    {item.label}
                    {
                      item.isSort && <i onClick={() => { headClick(item.prop) }}>^</i>
                    }
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody id="tbody">
            {
              bodyList.map(item => {
                return <tr class="body-tr">
                  <td class="body-td">{item.name}</td>
                  <td class="body-td">{item.sex}</td>
                  <td class="body-td">{item.age}</td>
                  <td class="body-td">{item.address}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      );
    };
  },
});
