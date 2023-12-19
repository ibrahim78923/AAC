import React, { useState } from 'react';
import { columnsTeams } from './TeamsTable.data';
import { Theme, useTheme } from '@mui/material';

const useTeamsTable = () => {
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsTeamDrawer(true);
  };

  const getRowValues = columnsTeams(setIsTeamDrawer, setIsOpenDelete, theme);
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
  };
};

export default useTeamsTable;
