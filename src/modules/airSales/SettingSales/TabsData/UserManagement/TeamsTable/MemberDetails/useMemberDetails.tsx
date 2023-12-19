import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';

const useMemberDetails = () => {
  const theme = useTheme<Theme>();
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsTeamDrawer(true);
  };
  return {
    theme,
    isTeamDrawer,
    setIsTeamDrawer,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    setAnchorEl,
    open,
    handleClick,
    handleClose,
  };
};

export default useMemberDetails;
