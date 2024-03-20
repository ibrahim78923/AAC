import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteTeamsMutation,
  useGetTeamsByIdQuery,
  useGetTeamsQuery,
} from '@/services/airSales/settings/teams';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';

const useTeams = (teamId?: any) => {
  const theme = useTheme<Theme>();
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState<any>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<any>(PAGINATION?.PAGE_LIMIT);
  const [deleteTeams] = useDeleteTeamsMutation();

  const params = {
    page: page,
    limit: limit,
    search: searchBy,
  };
  const { data: teamsData, isSuccess, isLoading } = useGetTeamsQuery(params);
  const { data: teamDataById } = teamId
    ? useGetTeamsByIdQuery(teamId)
    : { data: null };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    handleDeleteTeam,
  };
};

export default useTeams;
