import { useState } from 'react';
import { useTheme } from '@mui/material';

const usePropertiesTable = () => {
  const theme = useTheme();
  const [searchBy, setSearchBy] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  return {
    theme,
    searchBy,
    setSearchBy,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
  };
};

export default usePropertiesTable;
