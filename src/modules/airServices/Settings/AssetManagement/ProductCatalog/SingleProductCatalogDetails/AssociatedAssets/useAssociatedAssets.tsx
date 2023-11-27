import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { getAssociatedAssetsColumns } from './AssociatedAssets.data';

export const useAssociatedAssets = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [addModalOpen, setAddModalOpen] = useState(false);

  const columns = getAssociatedAssetsColumns(setIsDeleteModalOpen);

  const handleSubmitDelete = async () => {
    try {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar('Asset Deleted Successfully!', {
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
    setAddModalOpen,
    addModalOpen,
  };
};
