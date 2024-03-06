import {
  useDeleteTeamsMutation,
  useGetTeamsByIdQuery,
} from '@/services/airSales/settings/teams';
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
  const { data: teamDataById } = useGetTeamsByIdQuery(teamId);
  const [deleteTeams] = useDeleteTeamsMutation();

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
    teamDataById,
    isTeamDrawer,
    setIsTeamDrawer,
    isOpenDelete,
    setIsOpenDelete,
    handleDeleteTeam,
  };
};

export default useUserManagement;
