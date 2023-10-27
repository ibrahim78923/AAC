import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';

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
      pathname: AIR_SERVICES?.ASSETS_CONTRACTS_DETAIL,
    });
  };
  const handleCancelBtn = () => {
    router.push({
      pathname: AIR_SERVICES?.ASSETS_CONTRACTS_DETAIL,
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
