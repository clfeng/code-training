import { ColumnType } from '@/types/interface.ts'

export default function makeHeaderGroups($columns: ColumnType) {
  const headerGroups: HeaderGroupType[][] = [];
  const parentCache = new Map<number, number>();
  const allColumns: (ColumnType<unknown> & { key: number })[] = [];
  const getUid = createUid();

  // dfs 遍历
  (function traverse($columns: ColumnType, $parent?: number, depth = 0) {
    const columns = normalizeColumns($columns, $parent);
    const groups = columns.reduce((groups, { column, parent }) => {
      const { title, onSort, onFilter, children } =
        column as ColumnGroupType<unknown>;
      const hasChildren = (children || []).length > 0;
      const key = getUid();

      hasChildren && parentCache.set(key, children.length);
      hasChildren && traverse(children, key, depth + 1);

      allColumns.push({ ...column, key });
      return groups.concat({
        title,
        headerProps: { key, parent },
        onSort,
        onFilter,
      });
    }, [] as HeaderGroupType[]);

    headerGroups[depth] = (headerGroups[depth] || []).concat(groups);
  })($columns, undefined);
  return {
    allColumns,
    headerGroups,
    dataColumns: allColumns.filter((column) => {
      const { key } = column;
      return !parentCache.has(key);
    }),
  };
}