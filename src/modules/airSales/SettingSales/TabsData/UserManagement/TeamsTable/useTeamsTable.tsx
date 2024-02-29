import { useState } from 'react';
import { columnsTeams } from './TeamsTable.data';
import { Theme, useTheme } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { useGetTeamsByIdQuery } from '@/services/airSales/settings/teams';

const useTeamsTable = () => {
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [teamId, setTeamId] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();
  const { teamsData } = useUserManagement();
  const { data: teamDataById } = useGetTeamsByIdQuery(teamId);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsTeamDrawer(true);
  };

  const getRowValues = columnsTeams(
    setIsTeamDrawer,
    setIsOpenDelete,
    theme,
    setTeamId,
  );
  return {
    isTeamDrawer,
    setIsTeamDrawer,
    getRowValues,
    theme,
    anchorEl,
    setAnchorEl,
    open,
    handleClose,
    handleClick,
    isOpenDelete,
    setIsOpenDelete,
    teamsData,
    teamId,
    teamDataById,
  };
};

export default useTeamsTable;
