import { useState } from 'react';

import { useTheme } from '@mui/material';

const useNotesActionDropdown = ({ setOpenDrawer }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenEditDrawer = () => {
    setOpenDrawer('Edit');
    handleCloseMenu();
  };
  const handleOpenViewDrawer = () => {
    setOpenDrawer('View');
    handleCloseMenu();
  };

  const handleOpenDeleteAlert = () => {
    setIsOpenAlertModal(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlertModal(false);
  };

  return {
    theme,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    isOpenAlertModal,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
  };
};

export default useNotesActionDropdown;
