import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteDealNoteMutation } from '@/services/airSales/deals/view-details/note';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

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

  const [deleteDealNote, { isLoading: loadingNoteDelete }] =
    useDeleteDealNoteMutation();

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
      await deleteDealNote({ ids: selectedCheckboxesIds })?.unwrap();
      enqueueSnackbar(`Notes Deleted Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      handleCloseAlert();
      setSelectedCheckboxes([]);
    } catch (error: any) {
      const errMsg = error?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
    loadingNoteDelete,
  };
};

export default useNotesActionDropdown;
