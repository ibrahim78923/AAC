import { useState } from 'react';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ServicesActionDropdownFunction } from './ServicesAction.data';

export const useServicesAction = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const ServicesActionDropdown = ServicesActionDropdownFunction(
    setDeleteModalOpen,
    setOpen,
    setOpenStatus,
  );
  const handleDeleteBtn = () => {
    setDeleteModalOpen(false);
    enqueueSnackbar('Vendor deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    ServicesActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    open,
    setOpen,

    openStatus,
    setOpenStatus,
  };
};
