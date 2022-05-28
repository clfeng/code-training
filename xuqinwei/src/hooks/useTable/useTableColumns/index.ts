import { shallowRef, Slot, onBeforeUpdate, watchEffect } from 'vue'

import SiColumn from '../useTableColumns'

export default function useTableColumn(defaultSlot?: Slot) {
  const dataColumns = shallowRef<object[]>([]);

  // 获取si-table-column节点
  const getColumns = (slot?: Slot): any[] => {
    const children = slot && typeof slot === "function" ? slot() : [];
    console.log('slot', slot);

    return children.reduce((columns, child) => {
      const type = child.type;

      const {
        prop,
        "data-index": dataIndex,
        onSort,
        onFilter,
      } = (child.props ?? {}) as any;
      const column = { prop, dataIndex, onSort, onFilter };

      if (SiColumn === type) return columns.concat(column);
      return columns;
    }, [] as any[]);
  };

  const slotRef = shallowRef<Slot | undefined>(defaultSlot);
  console.log('columns', slotRef);

  onBeforeUpdate(() => (slotRef.value = defaultSlot));
  watchEffect(() => {
    const columns = getColumns(slotRef.value);
    dataColumns.value = columns;
  });
  return [dataColumns] as const;
}
