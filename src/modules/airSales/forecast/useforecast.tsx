import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const useForecast = () => {
  //states
  const theme = useTheme();
  const [isViewDealDrawer, setIsViewDealDrawer] = useState(false);
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useState(false);
  //functions

  return {
    theme,
    isOpenEventDrawer,
    setIsOpenEventDrawer,
    isViewDealDrawer,
    setIsViewDealDrawer,
  };
};

export default useForecast;
