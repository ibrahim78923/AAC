import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { defaultValues, emailTemplateSchema } from '../EmailTemplate.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useCreateEmail = () => {
  const router = useRouter();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState('laptop');

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(emailTemplateSchema),
  });

  const onSubmit = async () => {};

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return {
    openDialog,
    setOpenDialog,
    value,
    handleChange,
    router,
    theme,
    methods,
    onSubmit,
  };
};
