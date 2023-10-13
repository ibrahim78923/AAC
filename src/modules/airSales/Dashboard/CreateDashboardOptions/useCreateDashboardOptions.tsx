import React, { useState } from 'react';

import useToggle from '@/hooks/useToggle';

const useCreateDashboardOptions = () => {
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

  return {
    isShowDrawer,
    handleCloseDrawer,
    handleClickActions,
    setAnchorEl,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    setIsShowDrawer,
    isToggled,
    toggle,
  };
};

export default useCreateDashboardOptions;
