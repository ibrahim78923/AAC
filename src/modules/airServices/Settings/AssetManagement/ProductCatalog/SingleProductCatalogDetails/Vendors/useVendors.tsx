import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { getVendorsColumns } from './Vendors.data';

export const useVendors = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const columns = getVendorsColumns(setIsDeleteModalOpen, setIsUpsertModalOpen);

  const handleSubmitDelete = async () => {
    try {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar('Vendor Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar(error ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    columns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setIsUpsertModalOpen,
    isUpsertModalOpen,
  };
};
