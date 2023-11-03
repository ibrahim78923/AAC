import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { addAssociateAssetColumns } from './AddAssociateAsset.data';

export const useAddAssociateAsset = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeCheck, setActiveCheck] = useState([]);
  const handleAllocateClick = () => {
    enqueueSnackbar('Asset Associated Successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
    router?.push({
      pathname: AIR_SERVICES?.ASSETS_CONTRACTS_DETAIL,
    });
  };
  const handleCancelBtn = () => {
    router?.push({
      pathname: AIR_SERVICES?.ASSETS_CONTRACTS_DETAIL,
    });
  };
  const tableColumns = addAssociateAssetColumns(activeCheck, setActiveCheck);
  return {
    theme,
    activeCheck,
    setActiveCheck,
    handleAllocateClick,
    handleCancelBtn,
    tableColumns,
  };
};
