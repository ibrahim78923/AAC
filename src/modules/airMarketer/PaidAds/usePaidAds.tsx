import { useTheme } from '@mui/material';
import { useState } from 'react';

const usePaidAds = () => {
  //states
  const theme = useTheme();
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useState(false);
  //functions

  return {
    theme,
    isFilterDrawer,
    setIsFilterDrawer,
    isOpenEventDrawer,
    setIsOpenEventDrawer,
  };
};

export default usePaidAds;
