import { useState } from 'react';

import { useTheme } from '@mui/material';

const useUsersDetails = () => {
  const [tabValue, setTabVal] = useState<number>();
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const theme = useTheme();
  return {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
  };
};

export default useUsersDetails;
