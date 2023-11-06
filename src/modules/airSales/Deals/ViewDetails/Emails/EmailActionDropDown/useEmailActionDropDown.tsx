import React, { useState } from 'react';

import { useTheme } from '@mui/material';

const useEmailActionDropdown = ({ setOpenDrawer }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenForwardDrawer = () => {
    setOpenDrawer('Forward');
    handleCloseMenu();
  };
  const handleOpenReplyDrawer = () => {
    setOpenDrawer('Reply');
    handleCloseMenu();
  };
  const handleOpenReassignAlert = () => {
    setOpenAlertModal('Reassign');
  };
  const handleOpenDeleteAlert = () => {
    setOpenAlertModal('Delete');
  };
  const handleCloseAlert = () => {
    setOpenAlertModal('');
  };

  return {
    theme,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    openAlertModal,

    handleOpenReassignAlert,
    handleOpenDeleteAlert,
    handleCloseAlert,

    handleOpenForwardDrawer,
    handleOpenReplyDrawer,
  };
};

export default useEmailActionDropdown;
