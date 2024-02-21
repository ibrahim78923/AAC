import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const useWorkFlowTable = () => {
  //states
  const theme = useTheme();
  const [search, setSearch] = useState();
  //functions

  return {
    theme,
    search,
    setSearch,
  };
};

export default useWorkFlowTable;
