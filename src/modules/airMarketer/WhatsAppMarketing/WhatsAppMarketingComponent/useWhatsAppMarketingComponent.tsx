import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';

const useWhatsAppMarketingComponent = () => {
  const [tabVal, setTabVal] = useState<number>(0);
  const [isCreateBroadcast, setIsCreateBroadcast] = useState<boolean>(false);
  const theme = useTheme<Theme>();

  return {
    theme,
    tabVal,
    setTabVal,
    isCreateBroadcast,
    setIsCreateBroadcast,
  };
};

export default useWhatsAppMarketingComponent;
