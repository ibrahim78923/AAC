export interface CustomPaginationPropsI {
  count: number;
  rowsPerPageOptions: number[];
  entriePages: number;
  handleChangeRowsPerPage: () => void;
  rowsPerPage: any;
  handleChangePage: () => void;
  page: number;
}
