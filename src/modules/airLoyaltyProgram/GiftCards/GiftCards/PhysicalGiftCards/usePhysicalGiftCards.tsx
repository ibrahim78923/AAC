import { useTheme } from '@mui/material';
import { useEffect } from 'react';

export const usePhysicalGiftCards = (setShowButtons: any) => {
  const theme = useTheme();
  useEffect(() => {
    setShowButtons(true);
  }, []);

  return {
    theme,
  };
};
