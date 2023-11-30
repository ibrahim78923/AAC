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

export const useFilterInventory = (props: any) => {
  const { setIsDrawerOpen } = props;

  const router = useRouter();
  const theme: any = useTheme();
  const inventoryFilterFormFieldsData = inventoryFilterFormFieldsDataFunction();

  const methods: any = useForm({
    resolver: yupResolver(inventoryFilterFormSchema),
    defaultValues: inventoryFilterFormDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(() => inventoryFilterFormDefaultValuesFunction());
  }, [reset]);

  const submitInventoryFilterForm = async () => {};

  const closeInventoryFilterForm = () => {
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { tableAction, ...restQueries } = router?.query;
    router?.push({
      pathname: router?.pathname,
      query: {
        ...restQueries,
      },
    });
    setIsDrawerOpen?.(false);
  };

  return {
    inventoryFilterFormFieldsData,
    router,
    theme,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
    closeInventoryFilterForm,
  };
};
