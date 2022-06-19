import { shallowRef, Slot, onBeforeUpdate, watchEffect, computed, reactive } from 'vue'

export default function useTableColumn(defaultSlot?: Slot) {
  // const dataColumns = shallowRef<object[]>([]);

  // 获取si-table-column节点
  const getColumns = (slot?: Slot): any[] => {
    const children = slot && typeof slot === "function" ? slot() : [];

    return children.reduce((columns, child) => {
      const type = child.type;

      const {
        prop,
        "data-index": dataIndex,
        label,
        width,
        isSort,
        sortOrders,
        order
      } = (child.props ?? {}) as any;

      let sortOrdersConfig
      if (isSort) {
        sortOrdersConfig = reactive({
          sortOrders,
          asc: sortOrders.includes('asc'), //升序
          desc: sortOrders.includes('desc') //降序
        })
      }
      console.log('order', order);

      const column = { prop, dataIndex, label, width, isSort, order, sortOrders: sortOrdersConfig };

      return columns.concat(column);
    }, [] as any[]);
  };

  let dataColumns = computed(() => {
    const slotRef = shallowRef<Slot | undefined>(defaultSlot);
    const columns = getColumns(slotRef.value);
    return columns
  })
  // onBeforeUpdate(() => (slotRef.value = defaultSlot));
  // watchEffect(() => {
  //   const columns = getColumns(slotRef.value);
  //   dataColumns.value = columns;
  // });


  return [dataColumns] as const;
}
