import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useTheme } from '@mui/material';

export const useAddAssetAssociate = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeCheck, setActiveCheck] = useState([]);
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
    theme,
    activeCheck,
    setActiveCheck,
    handleAllocateClick,
    handleCancelBtn,
  };
};
