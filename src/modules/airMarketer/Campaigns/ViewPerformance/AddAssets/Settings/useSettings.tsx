import { useTheme } from '@mui/material';
import { useState } from 'react';

const useSettings = () => {
  const theme = useTheme();
  const [isOpenAddAssets, setIsOpenAddAssets] = useState(false);
  const handleCloseAddAssetsModal = () => {
    setIsOpenAddAssets(false);
  };
  return {
    theme,
    isOpenAddAssets,
    setIsOpenAddAssets,
    handleCloseAddAssetsModal,
  };
};
export default useSettings;
