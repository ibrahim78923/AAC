import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './UpsertInventory.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';

export const useUpsertInventory = () => {
  const { query }: any = useRouter();
  const theme = useTheme();
  const [formType, setFormType] = useState<string>('');
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const submit = async () => {};

  return {
    methods,
    submit,
    query,
    formType,
    setFormType,
    theme,
  };
};
