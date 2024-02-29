import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetCallsQuery } from '@/services/commonFeatures/contact-calls';

const useCalls = () => {
  // const [selectedRow, setSelectedRow]: any = useState([]);
  // const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  // const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });

  const { data: dataGetCalls, isLoading: loadingGetCalls } = useGetCallsQuery({
    params: filterParams,
  });

  // Hadle PAGE CHANGE
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilterParams((prev) => {
      return {
        ...prev,
        page: newPage,
      };
    });
  };

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');

  return {
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    loadingGetCalls,
    dataGetCalls,
    setPageLimit,
    handlePageChange,

    theme,
    openDrawer,
    setOpenDrawer,
  };
};

export default useCalls;
