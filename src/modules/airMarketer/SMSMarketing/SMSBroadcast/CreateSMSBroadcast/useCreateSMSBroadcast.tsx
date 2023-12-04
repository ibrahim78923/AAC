import { useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import { defaultValues, validationSchema } from './CreateSMSBroadcast.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useCreateSMSBroadcast = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const [textAreaVal, setTextAreaVal] = useState('');

  const { type } = navigate.query;

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    reset();
  };

  return {
    theme,
    navigate,
    isAddContactDrawerOpen,
    setIsAddContactDrawerOpen,
    type,
    onSubmit,
    handleSubmit,
    methods,
    textAreaVal,
    setTextAreaVal,
  };
};

export default useCreateSMSBroadcast;
