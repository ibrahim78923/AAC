import { useState } from 'react';
import { singleVendorDetailsActionDropdownFunction } from './SingleVendorDetail.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useSingleVendorDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();

  const singleVendorDetailsActionDropdown =
    singleVendorDetailsActionDropdownFunction(setDeleteModalOpen, router);
  const handleDeleteBtn = () => {
    setDeleteModalOpen(false);
    enqueueSnackbar('Vendor deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return {
    singleVendorDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
  };
};
