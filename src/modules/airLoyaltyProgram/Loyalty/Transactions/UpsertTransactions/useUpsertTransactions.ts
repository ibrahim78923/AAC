import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTransactionsDefaultValues,
  upsertTransactionsValidationSchema,
} from './UpsertTransactions.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';

export const useUpsertTransactions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const methods: any = useForm({
    resolver: yupResolver(upsertTransactionsValidationSchema),
    defaultValues: upsertTransactionsDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const submit = async () => {
    enqueueSnackbar('Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsDrawerOpen(false);
    reset();
  };

  return {
    methods,
    handleSubmit,
    submit,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
