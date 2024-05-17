import { successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { columns } from './allCalls.data';

export const useAllCalls = () => {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCallDetailsDrawerOpen, setIsCallDetailsDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExportDrawerOpen, setIsExportDrawerOpen] = useState(false);
  const getColumns = columns({ setIsCallDetailsDrawerOpen });
  const handleExcelExport = () => {
    successSnackbar('Excel Exported Successfully');
  };
  const handleCsvExport = () => {
    successSnackbar('CSV Exported Successfully');
  };
  return {
    theme,
    searchTerm,
    setSearchTerm,
    isCallDetailsDrawerOpen,
    setIsCallDetailsDrawerOpen,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getColumns,
    handleExcelExport,
    isDrawerOpen,
    setIsDrawerOpen,
    handleCsvExport,
    isExportDrawerOpen,
    setIsExportDrawerOpen,
  };
};
