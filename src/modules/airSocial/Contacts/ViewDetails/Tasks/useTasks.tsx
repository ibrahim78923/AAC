import { useState } from 'react';

import { useTheme } from '@mui/material';

const useTasks = () => {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState('');

  return {
    openDrawer,
    setOpenDrawer,
    theme,
  };
};

export default useTasks;
