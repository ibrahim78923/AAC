import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteEmailCompaniesMutation } from '@/services/commonFeatures/companies';
import { Gmail_CONST } from '@/constants';
import { ARRAY_INDEX } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useEmailActionDropdown = ({
  setOpenDrawer,
  selectedCheckboxes,
  setSelectedCheckboxes,
  companyId,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenForwardDrawer = () => {
    setOpenDrawer('forward');
    handleCloseMenu();
  };
  const handleOpenReplyDrawer = () => {
    setOpenDrawer('reply');
    handleCloseMenu();
  };
  const handleOpenReassignAlert = () => {
    setOpenAlertModal('Reassign');
  };
  const handleOpenDeleteAlert = () => {
    setOpenAlertModal('Delete');
  };
  const handleCloseAlert = () => {
    setOpenAlertModal('');
  };

  const [deleteEmailCompanies, { isLoading: loadingDelete }] =
    useDeleteEmailCompaniesMutation();

  const handleDeleteSubmit = async () => {
    try {
      await deleteEmailCompanies({
        id: selectedCheckboxes[ARRAY_INDEX?.ZERO]?._id,
        moduleId: companyId,
        moduleType: Gmail_CONST?.COMPANY,
      })?.unwrap();
      setAnchorEl(null);
      handleCloseAlert();
      setSelectedCheckboxes([]);
      successSnackbar('Email Delete successfully');
    } catch (error) {
      errorSnackbar('An error occured');
    }
  };

  return {
    theme,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    openAlertModal,

    handleOpenReassignAlert,
    handleOpenDeleteAlert,
    handleCloseAlert,

    handleOpenForwardDrawer,
    handleOpenReplyDrawer,
    handleDeleteSubmit,
    loadingDelete,
  };
};

export default useEmailActionDropdown;
