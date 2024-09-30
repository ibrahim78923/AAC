import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './SendEmailDrawer.data';
import {
  useLazyGetCustomersDropdownListQuery,
  useLazyGetCustomersGroupDropdownListQuery,
} from '@/services/airMarketer/lead-capture/forms/index';

export default function useSendEmailDrawer() {
  const customersData = useLazyGetCustomersDropdownListQuery();
  const customersGroupData = useLazyGetCustomersGroupDropdownListQuery();
  const [watchValues, setWatchValues] = React.useState<{
    isCustomers: boolean;
    isCustomersGroup: boolean;
  }>({
    isCustomers: false,
    isCustomersGroup: false,
  });
  const methods = useForm<any>({
    resolver: yupResolver(
      validationSchema(watchValues?.isCustomers, watchValues?.isCustomersGroup),
    ),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;
  const watchIsCustomers = watch('isCustomers');
  const watchIsCustomersGroup = watch('isCustomersGroup');

  useEffect(() => {
    setWatchValues({
      isCustomers: watchIsCustomers,
      isCustomersGroup: watchIsCustomersGroup,
    });
  }, [watchIsCustomers, watchIsCustomersGroup]);

  const onSubmitAddForm: any = async (values: any) => {
    alert('Form Submitted:: ' + values);
  };
  const handleFormSubmit = handleSubmit(onSubmitAddForm);

  return {
    customersData,
    customersGroupData,
    methods,
    reset,
    watchIsCustomers,
    watchIsCustomersGroup,
    handleFormSubmit,
  };
}
