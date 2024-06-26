import { PAGINATION } from '@/config';
import { useGetWhatsAppBroadcatsQuery } from '@/services/airMarketer/whatsapp-marketing';
import { Theme, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useBroadcast = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [actionsEl, setActionsEl] = useState(null);
  const [statusEl, setStatusEl] = useState(null);
  const statusMenuOpen = Boolean(statusEl);
  const actionsMenuOpen = Boolean(actionsEl);

  const whatsappParams = {
    page: page,
    limit: pageLimit,
    // commented for future use
    // search: filterValues?.search,
    // status: filterValues?.status ? filterValues?.status : undefined,
    // toDate: filterValues?.toDate
    //   ? dayjs(filterValues?.toDate)?.format(DATE_FORMAT?.API)
    //   : undefined,
    // fromDate: filterValues?.fromDate
    //   ? dayjs(filterValues?.fromDate)?.format(DATE_FORMAT?.API)
    //   : undefined,
  };

  const {
    data: whatsAppBroadcastData,
    // isLoading,
    // isSuccess,
  } = useGetWhatsAppBroadcatsQuery(whatsappParams);

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
  const handleStatusMenuClick = (event: any) => {
    setStatusEl(event?.currentTarget);
  };
  const handleStatusMenuClose = () => {
    setStatusEl(null);
  };

  // Actions Dropdown

  const handleActionsMenuClick = (event: any) => {
    setActionsEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setActionsEl(null);
  };

  // Delete Modal

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
    whatsAppBroadcastData,
  };
};

export default useBroadcast;
