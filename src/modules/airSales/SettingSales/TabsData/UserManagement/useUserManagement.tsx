import { PAGINATION } from '@/config';
import { DRAWER_TYPES } from '@/constants/strings';
import { useDeleteTeamsMutation } from '@/services/airSales/settings/teams';
import { useGetProductsUsersQuery } from '@/services/airSales/settings/users';
import { getActiveProductSession } from '@/utils';
import { Skeleton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useUserManagement = () => {
  const ActiveProduct = getActiveProductSession();
  const skeletonLines = [];
  const [teamId, setTeamId] = useState();
  const [checkedUser, setCheckedUser] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteTeams, { isLoading: deleteTeamLoading }] =
    useDeleteTeamsMutation();
  const [isAddTeam, setIsAddTeam] = useState({
    isToggle: false,
    type: DRAWER_TYPES?.ADD,
  });

  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isAddUserDrawer, setIsAddUserDrawer] = useState({
    isToggle: false,
    type: DRAWER_TYPES?.ADD,
    recordId: null,
  });
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const productUserParams = {
    page: page,
    limit: pageLimit,
    search: searchUser ? searchUser : undefined,
    product: ActiveProduct?._id,
    meta: true,
  };
  const {
    data: productsUsers,
    isLoading,
    isSuccess,
  } = useGetProductsUsersQuery(productUserParams);

  //handler delete team
  const handleDeleteTeam = async (id: any) => {
    try {
      await deleteTeams({ id: id })?.unwrap();
      setIsOpenDelete(false);
      enqueueSnackbar('Team deleted successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };
  // for skeleton
  for (let i = 0; i < 5; i++) {
    skeletonLines.push(
      <Skeleton key={i} animation="wave" height={60} sx={{ mb: 1 }} />,
    );
  }

  return {
    activeTab,
    setActiveTab,
    isAddTeam,
    setIsAddTeam,
    teamId,
    setTeamId,
    isTeamDrawer,
    setIsTeamDrawer,
    productsUsers,
    searchUser,
    setSearchUser,
    setPage,
    isLoading,
    isSuccess,
    setPageLimit,
    isAddUserDrawer,
    setIsAddUserDrawer,
    checkedUser,
    setCheckedUser,
    isOpenDelete,
    setIsOpenDelete,
    handleDeleteTeam,
    deleteTeamLoading,
    skeletonLines,
  };
};

export default useUserManagement;
