import { Pagination } from '@/types/services';

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  mobileGrid?: number;  
  customRender?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = Pagination<T> & {
  columns: ColumnConfig<T>[];
  canSelect?: boolean;
  handleChangePage?: (page: number) => void;
  handleChangeOrder?: (order: 'asc' | 'desc', orderBy: keyof T) => void;
  loading?: boolean;
};
