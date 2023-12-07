import { useState } from 'react';

import { useTheme } from '@mui/material';

const useDashboard = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState(0);

  return {
    theme,
    tabVal,
    setTabVal,
  };
};

export default useDashboard;
