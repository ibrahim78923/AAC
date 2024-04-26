import { useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';

const useSMSMarketing = () => {
  const navigate = useRouter();
  const [tabVal, setTabVal] = useState<number>(0);
  const [isNumberConnected, setIsNumberConnected] = useState<boolean>(true);
  const theme = useTheme<Theme>();

  return {
    theme,
    tabVal,
    setTabVal,
    navigate,
    isNumberConnected,
    setIsNumberConnected,
  };
};

export default useSMSMarketing;
