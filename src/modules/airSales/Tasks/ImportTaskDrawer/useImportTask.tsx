import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const useImportTask = () => {
  const theme: any = useTheme();

  const [isColumnsSelect, setIsColumnsSelect] = useState(false);

  const okTitle = isColumnsSelect ? 'Import' : 'Next';

  const handleSubmit = () => {
    if (!isColumnsSelect) {
      setIsColumnsSelect(true);
    }
  };
  const stepOneMethods = useForm({
    defaultValues: {},
  });
  const { handleSubmit: StepOneHandleSubmit } = stepOneMethods;
  const stepOneSubmit = () => {};
  return {
    handleSubmit,
    isColumnsSelect,
    setIsColumnsSelect,
    theme,
    okTitle,
    stepOneSubmit,
    StepOneHandleSubmit,
    stepOneMethods,
  };
};

export default useImportTask;
