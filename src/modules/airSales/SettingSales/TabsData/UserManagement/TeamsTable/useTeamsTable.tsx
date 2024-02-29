import { useState } from 'react';
import { columnsTeams } from './TeamsTable.data';
import { Theme, useTheme } from '@mui/material';
import {
  useGetTeamsByIdQuery,
  useGetTeamsQuery,
} from '@/services/airSales/settings/teams';
import { PAGINATION } from '@/config';

const useTeamsTable = () => {
  const theme = useTheme<Theme>();
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [teamId, setTeamId] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState<any>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<any>(PAGINATION?.PAGE_LIMIT);
  const { data: teamDataById } = useGetTeamsByIdQuery(teamId);

  const params = {
    page: page,
    limit: limit,
  };
  const { data: teamsData, isSuccess, isLoading } = useGetTeamsQuery(params);

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
    page,
    setPage,
    limit,
    setLimit,
    isSuccess,
    isLoading,
  };
};

export default useTeamsTable;
