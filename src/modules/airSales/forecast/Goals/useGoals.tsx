import { PAGINATION } from '@/config';
import { useAppSelector } from '@/redux/store';
import {
  useDeleteForecastGoalsMutation,
  useGetForecastGoalsQuery,
} from '@/services/airSales/forecast';
import { successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useGoals = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tableRowValues, setTableRowValues] = useState<string[]>([]);
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

  const filterData: any = useAppSelector(
    (state) => state?.forecastForm?.filterValues,
  );

  const {
    data: goalsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetForecastGoalsQuery({ params: { ...Params, ...filterData } });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const [deleteGoal, { isLoading: loadingDelete }] =
    useDeleteForecastGoalsMutation();

  const handleDelete = async () => {
    try {
      await deleteGoal({ ids: tableRowValues }).unwrap();
      successSnackbar('Record Deleted Successfully');
      setIsDelete(false);
      setTableRowValues([]);
      handleClose();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  return {
    theme,
    anchorEl,
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
    handleDelete,
    loadingDelete,
  };
};

export default useGoals;
