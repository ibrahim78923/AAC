import { successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { columns } from './allCalls.data';
import { useRouter } from 'next/router';

export const useAllCalls = () => {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCallDetailsDrawerOpen, setIsCallDetailsDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExportDrawerOpen, setIsExportDrawerOpen] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const router = useRouter();
  const getColumns = columns({
    setIsCallDetailsDrawerOpen,
    setIsViewDrawerOpen,
    setOpenAlertModal,
    router,
  });
  const handleExcelExport = () => {
    successSnackbar('Excel Exported Successfully');
  };
  const handleCsvExport = () => {
    successSnackbar('CSV Exported Successfully');
  };
  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };
  const handleCallsDelete = () => {
    setOpenAlertModal(false);
    successSnackbar('Calls Deleted Successfully');
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
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    openAlertModal,
    setOpenAlertModal,
    handleCloseAlertModal,
    handleCallsDelete,
  };
};
