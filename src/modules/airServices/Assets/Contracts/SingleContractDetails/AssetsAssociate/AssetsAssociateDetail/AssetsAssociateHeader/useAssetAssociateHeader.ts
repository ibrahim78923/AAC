import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';

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
    router?.push({
      pathname: AIR_SERVICES?.ADD_ASSOCIATE_ASSET,
    });
  };
  return {
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    handleAddAssociateAsset,
  };
};
