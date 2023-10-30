import { useState } from 'react';

import { useTheme } from '@mui/material';

const useImportContacts = () => {
  const theme: any = useTheme();

  const [isColumn, setIsColumn] = useState(false);
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);

  const handleSubmitColumn = () => {
    if (!isColumn) {
      setIsColumn(true);
    }
  };

  const handleFilterDrawer = () => {
    setIsFilterDrawer(!isFilterDrawer);
  };

  return {
    handleSubmitColumn,
    isColumn,
    theme,
    isFilterDrawer,
    handleFilterDrawer,
  };
};

export default useImportContacts;
