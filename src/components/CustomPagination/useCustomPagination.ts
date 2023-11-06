import { useTheme } from '@mui/material';
import { useState } from 'react';

export function useCustomPagination() {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const theme = useTheme();
  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  return {
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    theme,
  };
}
