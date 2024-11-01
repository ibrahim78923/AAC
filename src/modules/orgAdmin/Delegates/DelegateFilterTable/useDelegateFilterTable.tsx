import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const useDelegateFilterTable = () => {
  const [value, setValue] = useState();
  const [isFilter, setIsFilter] = useState(false);
  const theme: any = useTheme<Theme>();
  const methods: any = useForm({});
  return {
    value,
    setValue,
    isFilter,
    setIsFilter,
    theme,
    methods,
  };
};

export default useDelegateFilterTable;
