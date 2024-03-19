import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { importDefaultValues, importValidationSchema } from './FirstStep.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useFirstStep = () => {
  const [value, setValue] = useState('');
  const methods: any = useForm<any>({
    resolver: yupResolver(importValidationSchema),
    defaultValues: importDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    try {
      successSnackbar('');
      reset();
    } catch (error) {
      errorSnackbar();
    }
  };

  const handleSelect = (selectedValue: any) => {
    setValue(selectedValue);
  };

  return {
    handleSelect,
    value,
    handleSubmit,
    onSubmit,
    methods,
  };
};
