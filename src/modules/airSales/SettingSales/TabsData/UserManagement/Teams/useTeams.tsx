import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useGetTeamsByIdQuery,
  useGetTeamsQuery,
} from '@/services/airSales/settings/teams';
import { PAGINATION } from '@/config';

const useTeams = (teamId?: any) => {
  const theme = useTheme<Theme>();
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState<any>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<any>(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: limit,
    search: searchBy,
  };
  const { data: teamsData, isSuccess, isLoading } = useGetTeamsQuery(params);
  const { data: teamDataById } = useGetTeamsByIdQuery(teamId);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    // getRowValues,
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
    isLoading,
    searchBy,
    setSearchBy,
    teamDataById,
  };
};

export default useTeams;
