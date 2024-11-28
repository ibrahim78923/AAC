import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteDealNoteMutation } from '@/services/airSales/deals/view-details/note';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useNotesActionDropdown = ({
  setOpenDrawer,
  selectedCheckboxes,
  setSelectedCheckboxes,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const [deleteDealNote] = useDeleteDealNoteMutation();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

  const selectedCheckboxesIds = selectedCheckboxes?.map(
    (checked: any) => checked?.id,
  );

  const handleCloseAlert = () => {
    setIsOpenAlertModal(false);
  };

  const handleDeleteHandler = async () => {
    const SelectedNoteId =
      selectedCheckboxesIds?.length > 1
        ? selectedCheckboxesIds
        : selectedCheckboxesIds[0];
    try {
      await deleteDealNote({ ids: SelectedNoteId })?.unwrap();
      successSnackbar(`Notes Deleted Successfully`);
      handleCloseAlert();
      setSelectedCheckboxes([]);
      handleCloseMenu();
    } catch (error) {
      const errMsg = error?.data?.message;
      errorSnackbar(errMsg ?? 'Error occurred');
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
