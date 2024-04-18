import { useGetTeamsByIdQuery } from '@/services/airSales/settings/teams';
import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useTeamsDetails = (props: any) => {
  const theme = useTheme();

  const { teamId, okText, methods } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, isLoading } = useGetTeamsByIdQuery(teamId);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState<boolean>(false);
  const teamDataArray = data?.data?.accounts || [];

  const handleMenuClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return {
    handleMenuClick,
    handleMenuClose,
    anchorEl,
    teamDataArray,
    data,
    isLoading,
    theme,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    okText,
    methods,
  };
};
