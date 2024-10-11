import React, { useState } from 'react';
import { AIR_SALES_DASHBOARD } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

const useActionsOptions = (selectedDashboard: any) => {
  const router = useRouter();
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
  };

  const handleShowEmailDashboard = () => {
    setIsShowEmailDashboard(true);
    setIsShowDrawer(true);
    setAnchorEl(null);
  };

  const handleShowEditDashboard = () => {
    setIsShowEditDashboard(true);
  };

  const handleCloseMenuOptions = () => {
    setAnchorEl(null);
  };

  const copyUrl = () => {
    if (!selectedDashboard) {
      handleCloseMenuOptions();
      errorSnackbar('Dashboard link not found.');
      return;
    }
    const emailToCopy = `${window?.location?.origin}${AIR_SALES_DASHBOARD?.SINGLE_DASHBOARD}?dashboardId=${selectedDashboard?.dashboard?._id}`;
    navigator?.clipboard?.writeText(emailToCopy);
    handleCloseMenuOptions();
    successSnackbar('Link has been copied successfully.');
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
    copyUrl,
    router,
  };
};

export default useActionsOptions;
