import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useOverview = () => {
  const [openOverviewModal, setOpenOverviewModal] = useState(false);
  const theme = useTheme();
  return {
    openOverviewModal,
    setOpenOverviewModal,
    theme,
  };
};
