import { useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';

const useCreateSMSBroadcast = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);

  return {
    theme,
    navigate,
    isAddContactDrawerOpen,
    setIsAddContactDrawerOpen,
  };
};

export default useCreateSMSBroadcast;
