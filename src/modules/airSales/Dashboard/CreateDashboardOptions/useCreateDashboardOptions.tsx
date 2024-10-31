import React, { useState } from 'react';
import useToggle from '@/hooks/useToggle';

const useCreateDashboardOptions = (
  setSelectedDashboard: (id: string) => void,
) => {
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
  };
};

export default useCreateDashboardOptions;
