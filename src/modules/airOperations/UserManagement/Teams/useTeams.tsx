import { useTheme } from '@mui/material';
import { useState } from 'react';
import { teamList } from './Teams.data';
import { PAGINATION } from '@/config';
import {
  useDeleteTeamUsersMutation,
  useGetTeamListQuery,
} from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useTeams = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>();
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);

  const [selectedTeamList, setSelectedTeamList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<any>({
    val: false,
    rowId: null,
  });
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [teamData, setTeamData] = useState<any>({});

  const [deleteTeamUsersTrigger, deleteStatus] = useDeleteTeamUsersMutation();

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetTeamListQuery({ param });

  const metaData = data?.data?.meta;

  const submitDeleteModal = async () => {
    try {
      await deleteTeamUsersTrigger(deleteModal?.rowId)?.unwrap();
      successSnackbar('Delete Successfully');
      setDeleteModal(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submit = async () => {
    try {
      successSnackbar('Team Add Successfully');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const teamListColumn = teamList(
    selectedTeamList,
    setSelectedTeamList,
    data?.data?.userTeams,
    setIsDrawerOpen,
    setIsEditDrawerOpen,
    setDeleteModal,
    setTeamData,
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
    submit,
    metaData,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    deleteStatus,
    isCreateDrawerOpen,
    setIsCreateDrawerOpen,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    teamData,
  };
};
