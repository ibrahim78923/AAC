import { useState } from 'react';

import { useTheme } from '@mui/material';

const useDashboard = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState(0);

  const descriptionColor = '#A5ACBE';
  return {
    descriptionColor,
    theme,
    tabVal,
    setTabVal,
  };
};

export default useDashboard;
