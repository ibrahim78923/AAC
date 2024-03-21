import { useTheme } from '@mui/material';
import { useState } from 'react';
import { teamList } from './Teams.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';
import { useGetTeamListQuery } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useTeams = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState<boolean>(false);
  const [selectedTeamList, setSelectedTeamList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<any>({
    val: false,
    rowId: null,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetTeamListQuery({ param });

  const metaData = data?.data?.meta;

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const submitDeleteModal = async () => {
    try {
      successSnackbar('Delete Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submit = async () => {
    enqueueSnackbar('Team Add Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsDrawerOpen(false);
  };

  const teamListColumn = teamList(
    selectedTeamList,
    setSelectedTeamList,
    data?.data?.userTeams,
    setIsTeamDrawerOpen,
    setIsDrawerOpen,
    setDeleteModal,
  );
  return {
    theme,
    search,
    setSearch,
    selectedTeamList,
    setSelectedTeamList,
    teamListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModal,
    setDeleteModal,
    submitDeleteModal,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    handleMenuClick,
    handleMenuClose,
    anchorEl,
    submit,
    metaData,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
  };
};
