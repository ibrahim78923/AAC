import { Dispatch, SetStateAction } from 'react';

export interface TanstackTableColumnsI {
  accessorFn: (row: any) => any;
  id: string;
  cell: (info: any) => any;
  header: string | any;
  isSortable?: boolean;
}

export interface TanstackTablePropsI {
  columns: TanstackTableColumnsI[];
  data: any;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isPagination?: boolean;
  count?: number;
  pageLimit?: number;
  currentPage?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
  setPage?: Dispatch<SetStateAction<number>> | any;
  setPageLimit?: Dispatch<SetStateAction<number>> | any;
  rowsPerPageOptions?: number[];
  paginationPaddingX?: number;
  noDataTableText?: string;
  noDataTableImage?: any;
  errorChildren?: any;
  errorProps?: { [key: string]: any };
  rootSX?: any;
  showSerialNo?: boolean;
  incrementPageClick?: any;
  decrementPageClick?: any;
}
