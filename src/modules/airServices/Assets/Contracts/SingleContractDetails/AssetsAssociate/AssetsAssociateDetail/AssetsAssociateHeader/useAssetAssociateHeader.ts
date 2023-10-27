import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

export const useAssetAssociateHeader = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleDeleteSubmit = () => {
    enqueueSnackbar('Asset delete successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
    setOpenDeleteModal(false);
  };
  const handleAddAssociateAsset = () => {
    router.push({
      pathname: '/air-services/assets/contracts/detail/add-associate-asset',
    });
  };
  return {
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    handleAddAssociateAsset,
  };
};
