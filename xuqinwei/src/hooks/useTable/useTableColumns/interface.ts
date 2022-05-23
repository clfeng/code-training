
export interface HeaderGroupType {
  prop?: string;
  onSort?: (a: unknown, b: unknown) => number;
  onFilter?: (a: unknown, b: unknown) => boolean;
}