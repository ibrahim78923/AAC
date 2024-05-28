import { useState } from 'react';
import { useTheme } from '@mui/material';

const usePropertiesTable = () => {
  const theme = useTheme();
  const [searchBy, setSearchBy] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [createPropertyModal, setCreatePropertyModal] = useState(false);

  return {
    theme,
    searchBy,
    setSearchBy,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    createPropertyModal,
    setCreatePropertyModal,
  };
};

export default usePropertiesTable;
