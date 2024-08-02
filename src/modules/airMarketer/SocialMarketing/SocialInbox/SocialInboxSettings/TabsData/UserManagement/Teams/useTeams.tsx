import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { DRAWER_TYPES } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import {
  useDeleteTeamsMutation,
  useGetTeamsQuery,
} from '@/services/airMarketer/settings/teams';

const useTeams = () => {
  const theme = useTheme<Theme>();
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isAddTeam, setIsAddTeam] = useState({
    isToggle: false,
    type: DRAWER_TYPES?.ADD,
  });
  const [teamId, setTeamId] = useState('');
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [deleteTeams, { isLoading: deleteTeamLoading }] =
    useDeleteTeamsMutation();

  const params = {
    page: page,
    limit: limit,
    search: searchBy,
  };

  const {
    data: teamsData,
    isSuccess,
    isLoading: teamsDataLoading,
  } = useGetTeamsQuery(params);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    theme,
    anchorEl,
    setAnchorEl,
    open,
    handleClose,
    handleClick,
    teamsData,
    page,
    setPage,
    limit,
    setLimit,
    isSuccess,
    teamsDataLoading,
    searchBy,
    setSearchBy,
    isAddTeam,
    setIsAddTeam,
    teamId,
    setTeamId,
    isOpenDelete,
    setIsOpenDelete,
    deleteTeamLoading,
    handleDeleteTeam,
    isTeamDrawer,
    setIsTeamDrawer,
  };
};

export default useTeams;
