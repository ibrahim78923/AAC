import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const useDelegateFilterTable = () => {
  const [value, setValue] = useState();
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const theme: any = useTheme<Theme>();
  const methods: any = useForm({});
  return {
    value,
    setValue,
    isFilterDrawer,
    setIsFilterDrawer,
    theme,
    methods,
  };
};

export default useDelegateFilterTable;
