import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useTheme } from '@mui/material';

export const useAssetAssociate = () => {
  const router = useRouter();
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [activeCheck, setActiveCheck] = useState([]);
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
  const handleAllocateClick = () => {
    enqueueSnackbar('Asset Associated Successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
    router.push({
      pathname: '/air-services/assets/contracts/detail',
    });
  };
  const handleCancelBtn = () => {
    router.push({
      pathname: '/air-services/assets/contracts/detail',
    });
  };
  return {
    router,
    theme,
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    handleAddAssociateAsset,
    activeCheck,
    setActiveCheck,
    handleAllocateClick,
    handleCancelBtn,
  };
};
