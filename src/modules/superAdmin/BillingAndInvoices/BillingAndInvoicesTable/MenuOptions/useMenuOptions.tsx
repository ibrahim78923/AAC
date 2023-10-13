import React, { useState } from 'react';

const useMenuOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isShowGenerateInvoice, setIsShowGenerateInvoice] = useState(false);

  const [isShowViewBillingDetails, setIsShowViewBillingDetails] =
    useState(false);

  const [isShowEditDetails, setIsEditDetails] = useState(false);

  const openDropDown = Boolean(anchorEl);

  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
  };
};

export default useMenuOptions;
