import { useState } from 'react';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useServicesAction = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openVisibilityE1, setOpenVisibilityE1] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickVisibility = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteBtn = () => {
    setDeleteModalOpen(false);
    enqueueSnackbar('Vendor deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const handleCloseVisibility = () => {
    setOpenVisibilityE1(false);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setDeleteModalOpen?.(true);
    handleCloseMenu?.();
  };
  const handleStatus = () => {
    setOpenStatus?.(true);
    handleCloseMenu?.();
  };
  const handleCategory = () => {
    setOpen?.(true);
    handleCloseMenu?.();
  };
  const handleVisibility = () => {
    setOpenVisibilityE1?.(true);
    handleClickVisibility;
  };
  return {
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    open,
    setOpen,
    openStatus,
    setOpenStatus,
    openMenu,
    handleClickMenu,
    anchorEl,
    handleCloseMenu,
    handleDelete,
    handleStatus,
    handleCategory,
    handleClickVisibility,
    handleCloseVisibility,
    handleVisibility,
    openVisibilityE1,
  };
};
