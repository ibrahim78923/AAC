import React, { useState } from 'react';
import useToggle from '@/hooks/useToggle';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

const useCreateDashboardOptions = (
  setSelectedDashboard: (id: string) => void,
) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [isToggled, toggle] = useToggle(false);

  const handleCloseDrawer = () => {
    setIsShowDrawer(false);
  };
  const openDropDown = Boolean(anchorEl);

  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuOptions = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (dashboardId: string) => {
    setSelectedDashboard(dashboardId);
    handleCloseMenuOptions();
  };

  return {
    handleCloseMenuOptions,
    handleMenuItemClick,
    handleClickActions,
    handleCloseDrawer,
    setIsShowDrawer,
    openDropDown,
    isShowDrawer,
    setAnchorEl,
    isToggled,
    anchorEl,
    toggle,
    router,
    theme,
  };
};

export default useCreateDashboardOptions;
