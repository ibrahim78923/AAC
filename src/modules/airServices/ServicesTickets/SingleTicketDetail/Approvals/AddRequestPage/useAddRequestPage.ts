import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useAddRequestPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    theme,
  };
};
