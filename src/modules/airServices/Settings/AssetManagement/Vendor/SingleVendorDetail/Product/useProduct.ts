import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { productColumns } from './Product.data';

export const useProduct = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [upsertProductModal, setUpsertProductModal] = useState(false);
  const [editData, setEditData] = useState([]);

  const productListColumns = productColumns(
    setUpsertProductModal,
    setDeleteModalOpen,
    setEditData,
  );

  const handleDeleteBtn = () => {
    setDeleteModalOpen(false);
    enqueueSnackbar('Product deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return {
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    editData,
    setEditData,
    upsertProductModal,
    setUpsertProductModal,
    productListColumns,
  };
};
