import { mount, DOMWrapper } from "@vue/test-utils";
import { expect, SpyInstanceFn, test, vi } from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import SimpleTableColumn from "../src/components/SimpleTable/SimpleTableColumn.tsx";
import { PaginationProps } from "../src/components/Pagination/typs";
import { ref, reactive, toRefs } from 'vue'
import { TableColumnSortOrderString } from '../src/components/SimpleTable/type'
let list = [
  {
    "id": "360000201606043789",
    "username": "姚敏",
    "email": "l.sqyykxblep@brfyil.mm",
    "phone": "18877143167",
    "role": 0,
    "sex": 1,
    "addr": "除土立领本开理直置去界容京议圆路步。济这切质格金以行界给准群被红花市都程。红矿社西群位合应七了委管并近治当。革管名议给段提越数斯认期调再步适半实。",
    "createTime": 1091689294290504,
    "updateTime": 6659957728060912
  },
  {
    "id": "540000197708078311",
    "username": "韩平",
    "email": "p.bqsmw@gvnael.mg",
    "phone": "18833393236",
    "role": 2,
    "sex": 1,
    "addr": "者量入院花新区设值影何以观。就问争我平管团打学进交还标见入类。精为力每一便能带酸什利报得压把。回山片反局个已状空月调中把导其美拉。低复严点备则标将信生般何育大一给。称着入位同矿社非好安事打。",
    "createTime": -4802300337596172,
    "updateTime": -2706508520029004
  },
  {
    "id": "330000201012248052",
    "username": "潘杰",
    "email": "c.htc@gsbduuycxu.us",
    "phone": "15940868702",
    "role": 1,
    "sex": 1,
    "addr": "最要证积六了名大布先知提划空。文养年标事何新已又完会才国被。术那省并任常工条月议军所复红七并。见包究建原约公从状统达很律。中题大因利率维花前越走提一住。",
    "createTime": -1818642555232232,
    "updateTime": 1804120408496988
  },
  {
    "id": "540000201403163506",
    "username": "顾芳",
    "email": "m.qchlx@zesrihlwz.qa",
    "phone": "15532692274",
    "role": 1,
    "sex": 2,
    "addr": "使习区自大构始万农史九验七。快维始压山不表日调将等论很车。学受织区观问准斗家员同住老。规军重统义个技部持拉积问连马率级。是机却题还几给办近种年强知派。何到革持接己指路者于标个备率。加按果什商无育证五部动资整。",
    "createTime": -8551265131171972,
    "updateTime": -6793659710419332
  },
  {
    "id": "360000198811223370",
    "username": "蒋磊",
    "email": "p.jnbxvjix@rkuodwo.net",
    "phone": "18321975387",
    "role": 2,
    "sex": 2,
    "addr": "较些团群她难清地习自际已反。或他全装很计日性在可下些京们来离。相装于进确果场叫采各料片统基说并。何更或第候非系它过回文七。利成者标办候确业点认文自无力两。书由教作心总九共品便界领车劳作。",
    "createTime": -4125448022856380,
    "updateTime": -3125784626678336
  },
]

//验证排序状态
function validaSortOrder(th: DOMWrapper<Element>, order: TableColumnSortOrderString) {
  if (order === 'asc') {
    //升序按钮是否激活
    expect(th.find('.sort--asc').classes()).toContain('sort__icon--active')
    //降序按钮是否没激活
    expect(th.find('.sort--desc').classes()).not.toContain('sort__icon--active')
  } else if (order === 'desc') {
    //降序按钮是否激活
    expect(th.find('.sort--desc').classes()).toContain('sort__icon--active')
    //升序按钮是否没激活
    expect(th.find('.sort--asc').classes()).not.toContain('sort__icon--active')
  } else if (order === 'normal') {
    //升序、降序按钮都没激活
    expect(th.findAll('.sort__icon')).not.toContain('sort__icon--active')
  }
}

//验证列头排序
async function validaSort(th: DOMWrapper<Element>, prop: string, onSortChange: SpyInstanceFn<any[], any>, sortOrders?: TableColumnSortOrderString[]) {
  //排序轮流顺序，默认为升序、降序、正常
  sortOrders = sortOrders ?? ['asc', 'desc', 'normal']

  validaSortOrder(th, 'normal')
  //点击列头排序
  for (let order of sortOrders) {
    await th.trigger('click')
    expect(onSortChange).toBeCalledWith({ prop, order })
    validaSortOrder(th, order)
  }
}

//验证点击排序按钮
async function validaTrigger(th: DOMWrapper<Element>, prop: string, order: TableColumnSortOrderString, onSortChange: SpyInstanceFn<any[], any>) {
  validaSortOrder(th, 'normal')
  let btnClass = {
    'asc': '.sort--asc',
    'desc': '.sort--desc'
  }[order]
  await th.find(btnClass).trigger('click')
  expect(onSortChange).toBeCalledWith({ prop, order })
  validaSortOrder(th, order)
  await th.find(btnClass).trigger('click')
  expect(onSortChange).toBeCalledWith({ prop, order: 'normal' })
  validaSortOrder(th, 'normal')
}

//普通表格
test('mount table', () => {
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              row-key="id"
                              style="width: 980px" \>
                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="名称"
                                        prop="username"
                                        width="60">
                    <template v-slot="{ row }">
                      <div>{{ row.username }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column label="ID" prop="id" width="150" />
                  
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {
      let data = ref<unknown[]>(list);

      return { data }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
})

//排序表格
test('mount tableSortSortChange', async () => {
  const onSortChange = vi.fn()
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              row-key="id"
                              style="width: 980px"
                              @sort-change="onSortChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="名称"
                                        prop="username"
                                        width="60">
                    <template v-slot="{ row }">
                      <div>{{ row.username }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column label="邮箱" prop="email" sortable />
                  
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {
      let data = ref<unknown[]>(list);

      return { data, onSortChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();

  let emailTH = wrapper.findAll('.simple-table__header-warp .table__cell')[2]
  //验证点击列头排序
  await validaSort(emailTH, 'email', onSortChange)
  //验证点击升序按钮排序
  await validaTrigger(emailTH, 'email', 'asc', onSortChange)
  //验证点击降序排序
  await validaTrigger(emailTH, 'email', 'desc', onSortChange)

})

//默认激活排序表格
test('mount tableSortDefaultSort', () => {
  const onSortChange = vi.fn()
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              :default-sort = "{prop: 'role', order: 'asc'}"
                              row-key="id"
                              style="width: 980px"
                              @sort-change="onSortChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        sortable/>

                  <simple-table-column label="sex"
                                       prop="sex"
                                       sortable/>
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {
      let data = ref<unknown[]>(list);

      return { data, onSortChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();

  let roleTH = wrapper.findAll('.simple-table__header-warp .table__cell')[1]

  let sexTH = wrapper.findAll('.simple-table__header-warp .table__cell')[1]

  validaSortOrder(roleTH, 'asc')
  validaSortOrder(sexTH, 'normal')
})

//自定义排序轮流方式
test('mount tableSortSortOrders', async () => {
  const onSortChange = vi.fn()
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              :default-sort = "{prop: 'role', order: 'asc'}"
                              row-key="id"
                              style="width: 980px"
                              @sort-change="onSortChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        sortable/>

                  <simple-table-column label="sex"
                                       prop="sex"
                                       :sort-orders="['asc','desc']"
                                       sortable/>
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {
      let data = ref<unknown[]>(list);

      return { data, onSortChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();

  let sexTH = wrapper.findAll('.simple-table__header-warp .table__cell')[2]
  //验证点击列头排序
  await validaSort(sexTH, 'sex', onSortChange, ['asc', 'desc'])
})

//多列排序表格
test('mount tableSortMultiple', () => {
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              :default-sort = "[{prop: 'role', order: 'desc'}]"
                              row-key="id"
                              style="width: 980px"
                              order-column-multiple
                              @sort-change="sortChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        sortable/>

                  <simple-table-column label="sex"
                                       prop="sex"
                                       sortable/>
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {
      let data = ref<unknown[]>(list);

      function sortChange(sort) {
        console.log(sort, "sort");
      }

      return { data, sortChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
})

//多列排序自定义优先级表格
test('mount tableSortMultipleOrderType', () => {
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              :order-by = "['sex','role']"
                              :default-sort = "[{prop: 'role', order: 'desc'}]"
                              row-key="id"
                              style="width: 980px"
                              order-column-multiple
                              @sort-change="sortChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        sortable/>

                  <simple-table-column label="sex"
                                       prop="sex"
                                       sortable/>
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {
      let data = ref<unknown[]>(list);

      function sortChange(sort) {
        console.log(sort, "sort");
      }

      return { data, sortChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
})

//筛选表格
test("mount tableFilter", () => {
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              row-key="id"
                              style="width: 980px"
                              @filter-change="filterChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        :filters="[
                                          { text: 'a', value: 1 },
                                          { text: 'b', value: 2 },
                                        ]"/>

                  <simple-table-column label="地址" prop="addr" width="300" />
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {

      let data = ref<unknown[]>(list);

      function filterChange(filter) {
        console.log(filter, "filter");
      }

      return { data, filterChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});

//远程筛选表格
test("mount tableFilterCustom", () => {
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              filter-type="custom"
                              row-key="id"
                              style="width: 980px"
                              @filter-change="filterChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        :filters="[
                                          { text: 'a', value: 1 },
                                          { text: 'b', value: 2 },
                                        ]"/>

                  <simple-table-column label="地址" prop="addr" width="300" />
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {

      let data = ref<unknown[]>(list);

      function filterChange(filter) {
        console.log(filter, "filter");
      }

      return { data, filterChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});

//多列筛选表格
test("mount tableFilterMultiple", () => {
  const wrapper = mount({
    template: `<simple-table  :data="data"
                              row-key="id"
                              style="width: 980px"
                              filter-column-multiple
                              @filter-change="filterChange" \>

                  <simple-table-column label="ID" prop="id" width="150">
                    <template v-slot:header="{ column }">
                      <div>{{ column.label }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="名称"
                                        prop="username"
                                        width="60"
                                        :filters="[
                                          { text: 'a', value: 1 },
                                          { text: 'b', value: 2 },
                                        ]">
                    <template v-slot="{ row }">
                      <div>{{ row.username }}</div>
                    </template>
                  </simple-table-column>

                  <simple-table-column  label="role"
                                        prop="role"
                                        :filters="[
                                          { text: 'a', value: 1 },
                                          { text: 'b', value: 2 },
                                        ]"/>

                  <simple-table-column label="地址" prop="addr" width="300" />
              </simple-table>`,
    components: {
      "simple-table-column": SimpleTableColumn,
      "simple-table": SimpleTable
    },
    setup() {

      let data = ref<unknown[]>(list);

      function filterChange(filter) {
        console.log(filter, "filter");
      }

      return { data, filterChange }
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});