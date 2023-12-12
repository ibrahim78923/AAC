import { PAGINATION } from '@/config';
import { Theme, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useBroadcast = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  // Hadle PAGE CHANGE
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // setFilterParams((prev) => {
    //   return {
    //     ...prev,
    //     page: newPage,
    //   };
    // });
  };

  // Status Dropdown
  const [statusEl, setStatusEl] = useState(null);
  const handleStatusMenuClick = (event: any) => {
    setStatusEl(event?.currentTarget);
  };
  const handleStatusMenuClose = () => {
    setStatusEl(null);
  };
  const statusMenuOpen = Boolean(statusEl);

  // Actions Dropdown
  const [actionsEl, setActionsEl] = useState(null);
  const handleActionsMenuClick = (event: any) => {
    setActionsEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setActionsEl(null);
  };
  const actionsMenuOpen = Boolean(actionsEl);

  // Delete Modal
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };

  const statusTag = (val: any) => {
    switch (val) {
      case 'Completed':
        return theme?.palette?.primary?.main;
      case 'Scheduled':
        return theme?.palette?.warning?.main;
      case 'Draft':
        return theme?.palette?.grey[900];
      case 'Processing':
        return theme?.palette?.success?.main;
    }
  };

  return {
    theme,
    navigate,
    statusTag,
    statusEl,
    statusMenuOpen,
    handleStatusMenuClick,
    handleStatusMenuClose,
    actionsEl,
    actionsMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    openModalDelete,
    handleOpenDelete,
    handleCloseDelete,
    setPageLimit,
    setPage,
    handlePageChange,
    page,
    pageLimit,
  };
};

export default useBroadcast;
