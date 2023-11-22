import { useState } from 'react';

import { Theme, useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

const useDelegateFilterTable = () => {
  const [inProgress, setInProgress] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [value, setValue] = useState();
  const [status, setStatus] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const theme: any = useTheme<Theme>();
  const methods: any = useForm({});
  return {
    inProgress,
    setInProgress,
    setIsComplete,
    isComplete,
    value,
    setValue,
    status,
    setStatus,
    isFilter,
    setIsFilter,
    theme,
    methods,
  };
};

export default useDelegateFilterTable;
