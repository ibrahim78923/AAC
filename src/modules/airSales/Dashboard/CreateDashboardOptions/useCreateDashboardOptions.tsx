import React, { useState } from 'react';
import useToggle from '@/hooks/useToggle';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';

const useCreateDashboardOptions = (selectedDashboard: (id: string) => void) => {
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

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_SALES?.MANAGE_DASHBOARD}`,
    });
  };

  const handleMenuItemClick = (dashboardId: string) => {
    selectedDashboard(dashboardId);
    handleCloseMenuOptions();
  };

  return {
    handleCloseMenuOptions,
    handleMenuItemClick,
    handleClickActions,
    handleCloseDrawer,
    setIsShowDrawer,
    handelNavigate,
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
