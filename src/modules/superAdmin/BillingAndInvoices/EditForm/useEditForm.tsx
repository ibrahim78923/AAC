import { useState } from 'react';
import { defaultValues, validationSchema } from './EditForm.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

const useEditForm = ({ isEditModal }: any) => {
  const [selectProductSuite, setSelectProductSuite] = useState('product');

  const rowApiValues = {
    clientName: 'abc',
    product: 'def',
    planType: 'ghi',
    additionalUser: 'we',
    planPrice: 'cv',
    defaultUser: 'bvb',
    defaultUserTwo: 'bvn',
    additionalStorage: 'io',
    discount: 'gf',
    billingCycle: 'cxzc',
    date: new Date(),
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: defaultValues,
  });

  const apiMethods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: rowApiValues,
  });

  const { handleSubmit, reset } = isEditModal ? apiMethods : methods;

  const onSubmit = async () => {
    reset();
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
  };

  return {
    selectProductSuite,
    setSelectProductSuite,
    methods,
    apiMethods,
    handleSubmit,
    onSubmit,
  };
};

export default useEditForm;
