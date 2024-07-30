import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useGetTeamsByIdQuery,
  useGetTeamsQuery,
} from '@/services/airSales/settings/teams';
import { PAGINATION } from '@/config';

const useTeams = (teamId?: string) => {
  const theme = useTheme<Theme>();
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);

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
  const { data: teamDataById, isLoading: teamByIdLoading } =
    teamId !== undefined
      ? useGetTeamsByIdQuery(teamId)
      : { data: null, isLoading: false };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    teamDataById,
    teamByIdLoading,
  };
};

export default useTeams;
