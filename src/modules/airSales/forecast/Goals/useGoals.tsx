import { PAGINATION } from '@/config';
import { successSnackbar } from '@/lib/snackbar';
import {
  useDeleteForecastGoalsMutation,
  useGetForecastTeamGoalsQuery,
  useGetForecastUserGoalsQuery,
} from '@/services/airSales/forecast';
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
  const [pageTeam, setPageTeam] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimitTeam, setPageLimitTeam] = useState(PAGINATION?.PAGE_LIMIT);
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [selectedSerial, setSelectedSerial] = useState(null);

  const [alignment, setAlignment] = useState('User');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    setFilterValues('');
    setSearch('');
    setTableRowValues([]);
    setSelectedSerial(null);
  };

  const Params = {
    page: alignment === 'User' ? page : pageTeam,
    limit: alignment === 'User' ? pageLimit : pageLimitTeam,
    search: search,
  };

  const open = Boolean(anchorEl);

  const {
    data: goalsData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetForecastUserGoalsQuery(
    alignment === 'User' ? { params: { ...Params, ...filterValues } } : {},
    { skip: alignment === 'Team' },
  );

  const {
    data: goalsTeamData,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    isSuccess: isSuccessTeam,
    isFetching: isFetchingTeam,
  } = useGetForecastTeamGoalsQuery(
    alignment === 'Team' ? { params: { ...Params, ...filterValues } } : {},
    { skip: alignment === 'User' },
  );

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
    setSearch,
    handleDelete,
    loadingDelete,
    goalsTeamData,
    isLoadingTeam,
    isErrorTeam,
    isSuccessTeam,
    isFetchingTeam,
    setPageTeam,
    setPageLimitTeam,
    alignment,
    handleChange,
    isFilterDrawer,
    setIsFilterDrawer,
    setFilterValues,
    filterValues,
    selectedSerial,
    setSelectedSerial,
  };
};

export default useGoals;
