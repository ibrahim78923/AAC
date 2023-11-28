import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteDealNoteMutation } from '@/services/airSales/deals/view-details/note';
import { enqueueSnackbar } from 'notistack';

const useNotesActionDropdown = ({
  setOpenDrawer,
  selectedCheckboxes,
  setSelectedCheckboxes,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [deleteDealNote] = useDeleteDealNoteMutation();

  const handleOpenEditDrawer = () => {
    setOpenDrawer('Edit');
    handleCloseMenu();
  };
  const handleOpenViewDrawer = () => {
    setOpenDrawer('View');
    handleCloseMenu();
  };

  const handleOpenDeleteAlert = () => {
    setIsOpenAlertModal(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlertModal(false);
  };

  const selectedCheckboxesIds = selectedCheckboxes?.map(
    (checked: any) => checked?._id,
  );

  const handleDeleteHandler = async () => {
    try {
      await deleteDealNote({ id: selectedCheckboxesIds })?.unwrap();
      enqueueSnackbar(`Notes Deleted Successfully`, { variant: 'success' });
      handleCloseAlert();
      setSelectedCheckboxes([]);
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  return {
    theme,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    isOpenAlertModal,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
    handleDeleteHandler,
  };
};

export default useNotesActionDropdown;
