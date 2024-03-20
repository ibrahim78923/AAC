import { PAGINATION } from '@/config';
import { useDeleteTeamsMutation } from '@/services/airSales/settings/teams';
import { useGetProductsUsersQuery } from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useUserManagement = () => {
  const [teamId, setTeamId] = useState();
  const [checkedUser, setCheckedUser] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteTeams, { isLoading: deleteTeamLoading }] =
    useDeleteTeamsMutation();
  const [isAddTeam, setIsAddTeam] = useState({
    isToggle: false,
    type: 'add',
  });
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isAddUserDrawer, setIsAddUserDrawer] = useState({
    isToggle: false,
    type: 'add',
  });
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const productUserParams = {
    page: page,
    limit: pageLimit,
    search: searchUser ? searchUser : undefined,
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
  };
};

export default useUserManagement;
