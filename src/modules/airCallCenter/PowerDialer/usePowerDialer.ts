import { useTheme } from '@mui/material';
import { useState } from 'react';

export const usePowerDialer = () => {
  const theme = useTheme();
  const [powerDialerModal, setPowerDialerModal] = useState(false);

  // Add your custom hook logic here

  return {
    theme,
    powerDialerModal,
    setPowerDialerModal,
  };
};
