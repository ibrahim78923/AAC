import { AIR_MARKETER_DASHBOARD } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const useShareOptions = (selectedDashboard: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const handleCloseDrawer = () => {
    setIsShowDrawer(false);
  };
  const [isShowCopyUrl, setIsShowCopyUrl] = useState(false);

  const [isShowEmailDashboard, setIsShowEmailDashboard] = useState(false);

  const [isShowEditDashboard, setIsShowEditDashboard] = useState(false);
  const [isDownloadDashboad, setIsDownloadDashboard] = useState(false);

  const openDropDown = Boolean(anchorEl);

  const handleShowCopyUrl = () => {
    setIsShowCopyUrl(true);
    handleCloseMenuOptions();
  };

  const handleShowEmailDashboard = () => {
    setIsShowEmailDashboard(true);
    setIsShowDrawer(true);
    handleCloseMenuOptions();
  };

  const handleShowEditDashboard = () => {
    setIsShowEditDashboard(true);
  };

  const handleCloseMenuOptions = () => {
    setAnchorEl(null);
  };

  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const copyUrl = () => {
    if (!selectedDashboard) {
      handleCloseMenuOptions();
      errorSnackbar('Dashboard link not found.');
      return;
    }
    const emailToCopy = `${window?.location?.origin}${AIR_MARKETER_DASHBOARD?.SINGLE_DASHBOARD}?dashboardId=${selectedDashboard?.dashboard?._id}`;
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
    router,
    copyUrl,
    isDownloadDashboad,
    setIsDownloadDashboard,
  };
};

export default useShareOptions;
