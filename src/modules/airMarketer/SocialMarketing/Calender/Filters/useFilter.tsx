import React, { useState } from 'react';

const useFilter = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profilesAnchorEl, setProfilesAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [isShowGenerateInvoice, setIsShowGenerateInvoice] = useState(false);

  const [isShowViewBillingDetails, setIsShowViewBillingDetails] =
    useState(false);

  const [isShowEditDetails, setIsEditDetails] = useState(false);

  const openDropDown = Boolean(anchorEl);
  const openDropDownprofiles = Boolean(profilesAnchorEl);

  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfilesClickActions = (event: React.MouseEvent<HTMLElement>) => {
    setProfilesAnchorEl(event.currentTarget);
  };

  const handleShowGenerateInvoive = () => {
    setIsShowGenerateInvoice(true);
  };

  const handleShowViewBillingDetails = () => {
    setIsShowViewBillingDetails(true);
  };

  const handleShowEditDetails = () => {
    setIsEditDetails(true);
  };

  const handleCloseMenuOptions = () => {
    setAnchorEl(null);
  };

  const handleProfilesCloseMenuOptions = () => {
    setProfilesAnchorEl(null);
  };

  return {
    handleClickActions,

    handleShowGenerateInvoive,
    handleShowViewBillingDetails,
    handleCloseMenuOptions,

    anchorEl,
    openDropDown,
    setAnchorEl,
    handleShowEditDetails,
    isShowGenerateInvoice,
    isShowViewBillingDetails,
    setIsShowViewBillingDetails,
    isShowEditDetails,
    handleProfilesCloseMenuOptions,
    handleProfilesClickActions,
    profilesAnchorEl,
    openDropDownprofiles,
  };
};

export default useFilter;
