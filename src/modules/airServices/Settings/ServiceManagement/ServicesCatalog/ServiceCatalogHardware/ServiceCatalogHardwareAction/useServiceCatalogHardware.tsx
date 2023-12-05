import { useState } from 'react';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ServiceCatalogHardwareActionDropdownFunction } from './ServiceCatalogHardwareAction.data';

export const useServiceCatalogHardwareAction = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const ServiceCatalogHardwareActionDropdown =
    ServiceCatalogHardwareActionDropdownFunction(setDeleteModalOpen);
  const handleDeleteBtn = () => {
    setDeleteModalOpen(false);
    enqueueSnackbar('Vendor deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return {
    ServiceCatalogHardwareActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
  };
};
