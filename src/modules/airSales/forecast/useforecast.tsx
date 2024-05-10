import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const useForecast = () => {
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

export default useForecast;
