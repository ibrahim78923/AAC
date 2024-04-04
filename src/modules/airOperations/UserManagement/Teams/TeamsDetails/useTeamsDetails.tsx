import { useGetTeamsByIdQuery } from '@/services/airSales/settings/teams';
import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useTeamsDetails = (props: any) => {
  const theme = useTheme();
  const { isTeamDrawerOpen } = props;
  const teamId = isTeamDrawerOpen?.rowId;
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, isLoading } = useGetTeamsByIdQuery(teamId);

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
  };
};
