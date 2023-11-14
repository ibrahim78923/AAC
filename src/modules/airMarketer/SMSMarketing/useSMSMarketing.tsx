import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';

const useSMSMarketing = () => {
  const [tabVal, setTabVal] = useState<number>(0);
  const [isCreateSmsBroadcast, setIsCreateSmsBroadcast] = useState(false);
  const theme = useTheme<Theme>();

  return {
    theme,
    tabVal,
    setTabVal,
    isCreateSmsBroadcast,
    setIsCreateSmsBroadcast,
  };
};

export default useSMSMarketing;
