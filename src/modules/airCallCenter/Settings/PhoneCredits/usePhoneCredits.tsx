import { successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { phoneCreditsFormDefaultValues } from './PhoneCredits.data';

export const usePhoneCredits = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const methods = useForm({
    defaultValues: phoneCreditsFormDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setIsDrawerOpen?.(false);
    successSnackbar('Call Tag Added Successfully');
  };
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handleSubmit,
    onSubmit,
    methods,
    reset,
  };
};
