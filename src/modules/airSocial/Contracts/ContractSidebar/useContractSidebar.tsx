import { useTheme } from '@mui/material';
import { useState } from 'react';

const useContractSidebar = () => {
  const theme = useTheme();
  const [searchby, setSearchby] = useState('');

  return {
    searchby,
    theme,
    setSearchby,
  };
};
export default useContractSidebar;
