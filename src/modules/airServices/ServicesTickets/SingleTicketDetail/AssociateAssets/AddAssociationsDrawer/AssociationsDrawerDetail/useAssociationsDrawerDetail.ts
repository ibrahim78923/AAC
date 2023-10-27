import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useAssociationsDrawerDetail = () => {
  const [DrawerData, setDrawerData] = useState([]);
  const theme = useTheme();
  return {
    DrawerData,
    setDrawerData,
    theme,
  };
};
