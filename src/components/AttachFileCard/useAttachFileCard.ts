import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useAttachFileCard = () => {
  const theme = useTheme();

  const [cross, setCross] = useState(false);

  return {
    theme,
    cross,
    setCross,
  };
};
