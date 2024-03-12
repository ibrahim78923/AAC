import { useDeleteTeamsMutation } from '@/services/airSales/settings/teams';
import { useGetProductsUsersQuery } from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useUserManagement = () => {
  const [teamId, setTeamId] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [isAddTeam, setIsAddTeam] = useState({
    isToggle: false,
    type: 'add',
    data: {},
  });
  const [isAddUser, setIsAddUser] = useState(false);
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [deleteTeams] = useDeleteTeamsMutation();
  const productUserParams = {
    // page: 1,
    // limit: 10,
    search: searchUser ? searchUser : undefined,
  };
  const { data: productsUsers } = useGetProductsUsersQuery(productUserParams);

  const handleDeleteTeam = async (id: any) => {
    try {
      await deleteTeams({ id: id })?.unwrap();
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
    isAddUser,
    setIsAddUser,
    teamId,
    setTeamId,
    isTeamDrawer,
    setIsTeamDrawer,
    isOpenDelete,
    setIsOpenDelete,
    handleDeleteTeam,
    productsUsers,
    searchUser,
    setSearchUser,
  };
};

export default useUserManagement;
