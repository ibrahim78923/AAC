import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  inventoryFilterFormDefaultValuesFunction,
  inventoryFilterFormFieldsDataFunction,
  inventoryFilterFormSchema,
} from './FilterInventory.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export const useFilterInventory = () => {
  const router = useRouter();
  const theme: any = useTheme();
  const inventoryFilterFormFieldsData = inventoryFilterFormFieldsDataFunction(
    router?.query?.action === 'view',
  );

  const methods: any = useForm({
    resolver: yupResolver(inventoryFilterFormSchema),
    defaultValues: inventoryFilterFormDefaultValuesFunction(),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(() => inventoryFilterFormDefaultValuesFunction());
  }, [reset]);

  const submitInventoryFilterForm = async () => {};

  return {
    inventoryFilterFormFieldsData,
    router,
    theme,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
  };
};
