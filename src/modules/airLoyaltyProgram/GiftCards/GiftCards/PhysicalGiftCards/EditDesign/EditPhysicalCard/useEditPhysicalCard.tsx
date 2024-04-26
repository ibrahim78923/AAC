import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useEditPhysicalCard = () => {
  const theme = useTheme();
  const [flip, setFlip] = useState(false);

  return {
    theme,
    flip,
    setFlip,
  };
};
