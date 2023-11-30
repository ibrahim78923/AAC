import { useState } from 'react';

import { useTheme } from '@mui/material';

const useViewAccounts = () => {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  return {
    theme,
    searchTerm,
    setSearchTerm,
  };
};

export default useViewAccounts;
