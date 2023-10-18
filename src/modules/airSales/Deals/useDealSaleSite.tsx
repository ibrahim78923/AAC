import { useState } from 'react';

import { useTheme } from '@mui/material';

const useDealSaleSite = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState('actions');

  const handleActions = (e: any) => {
    setActions(e.target.value);
  };

  return {
    search,
    setSearch,
    actions,
    setActions,
    handleActions,
    theme,
  };
};

export default useDealSaleSite;
