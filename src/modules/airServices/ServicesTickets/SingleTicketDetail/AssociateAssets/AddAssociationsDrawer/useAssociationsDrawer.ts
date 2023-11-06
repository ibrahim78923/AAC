import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useAssociationsDrawer = () => {
  const [drawerData, setDrawerData] = useState([]);
  const theme = useTheme();
  return {
    drawerData,
    setDrawerData,
    theme,
  };
};
