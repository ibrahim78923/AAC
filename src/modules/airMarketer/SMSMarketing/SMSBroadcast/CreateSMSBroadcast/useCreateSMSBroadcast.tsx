import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';

const useCreateSMSBroadcast = () => {
  const theme = useTheme<Theme>();
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);

  return {
    theme,
    isAddContactDrawerOpen,
    setIsAddContactDrawerOpen,
  };
};

export default useCreateSMSBroadcast;
