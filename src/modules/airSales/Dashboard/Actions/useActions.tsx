import React, { useState } from 'react';

const useActions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const handleCloseDrawer = () => {
    setIsShowDrawer(false);
  };
  const [isShowCopyUrl, setIsShowCopyUrl] = useState(false);

  const [isShowEmailDashboard, setIsShowEmailDashboard] = useState(false);

  const [isShowEditDashboard, setIsShowEditDashboard] = useState(false);

  const openDropDown = Boolean(anchorEl);

  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShowCopyUrl = () => {
    setIsShowCopyUrl(true);
    setIsShowDrawer(true);
  };

  const handleShowEmailDashboard = () => {
    setIsShowEmailDashboard(true);
  };

  const handleShowEditDashboard = () => {
    setIsShowEditDashboard(true);
  };

  const handleCloseMenuOptions = () => {
    setAnchorEl(null);
  };

  return {
    isShowDrawer,
    handleCloseDrawer,
    handleClickActions,
    setAnchorEl,
    handleShowCopyUrl,
    handleShowEmailDashboard,
    handleCloseMenuOptions,
    handleShowEditDashboard,
    anchorEl,
    openDropDown,
    isShowCopyUrl,
    isShowEmailDashboard,
    isShowEditDashboard,
    setIsShowCopyUrl,
    setIsShowDrawer,
    setIsShowEmailDashboard,
    setIsShowEditDashboard,
  };
};

export default useActions;
