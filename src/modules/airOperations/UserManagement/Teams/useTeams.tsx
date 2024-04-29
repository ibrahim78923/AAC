import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { teamList } from './Teams.data';
import { PAGINATION } from '@/config';
import {
  useDeleteTeamUsersMutation,
  useGetTeamListQuery,
  useLazyGetTeamsByIdQuery,
} from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

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
  const [search, setSearch] = useState('');
  const [teamData, setTeamData] = useState<any>({});
  const router = useRouter();

  const [deleteTeamUsersTrigger, deleteStatus] = useDeleteTeamUsersMutation();

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetTeamListQuery({ param }, { refetchOnMountOrArgChange: true });

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

  const teamListColumn = teamList(
    selectedTeamList,
    setSelectedTeamList,
    data?.data?.userTeams,
    setIsDrawerOpen,
    setIsEditDrawerOpen,
    setDeleteModal,
    setTeamData,
    router,
  );
  const teamId = router?.query?.teamId;
  const [teamByIdTrigger, { data: teamIdData }] = useLazyGetTeamsByIdQuery();
  const handleTeamById = async () => {
    await teamByIdTrigger(teamId);
  };
  useEffect(() => {
    handleTeamById();
  }, [teamId, isEditDrawerOpen]);
  const onClose = () => {
    setIsEditDrawerOpen(false);
    router?.push({
      pathname: router.pathname,
    });
  };
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
    router,
    onClose,
    teamIdData,
  };
};
