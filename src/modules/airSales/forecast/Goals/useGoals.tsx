import { PAGINATION } from '@/config';
import { useGetForecastGoalsQuery } from '@/services/airSales/forecast';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const useGoals = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState();
  const [isEditDrawer, setIsEditDrawer] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const Params = {
    page: page,
    limit: pageLimit,
    search: search,
  };

  const open = Boolean(anchorEl);

  const {
    data: goalsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetForecastGoalsQuery({ params: { ...Params } });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  return {
    theme,
    anchorEl,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    open,
    handleClose,
    handleClick,
    setAnchorEl,
    isEditDrawer,
    setIsEditDrawer,
    isDelete,
    setIsDelete,
    goalsData,
    isLoading,
    setPageLimit,
    setPage,
    isError,
    isSuccess,
    isFetching,
    search,
    setSearch,
  };
};

export default useGoals;
