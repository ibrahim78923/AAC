import { useState } from 'react';
import { columnsTeams } from './Teams.data';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteTeamsMutation,
  useGetTeamsByIdQuery,
  useGetTeamsQuery,
} from '@/services/airSales/settings/teams';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';

const useTeams = () => {
  const theme = useTheme<Theme>();
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [teamId, setTeamId] = useState();
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState<any>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<any>(PAGINATION?.PAGE_LIMIT);
  const { data: teamDataById } = useGetTeamsByIdQuery(teamId);
  const [deleteTeams] = useDeleteTeamsMutation();

  const params = {
    page: page,
    limit: limit,
    search: searchBy,
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
    handleDeleteTeam,
    teamDataById,
    page,
    setPage,
    limit,
    setLimit,
    isSuccess,
    isLoading,
    searchBy,
    setSearchBy,
  };
};

export default useTeams;
