import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AddInventory.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostAssetInventoryMutation } from '@/services/airServices/assets-inventory';

export const useAddInventory = () => {
  const { query }: any = useRouter();

  const [AddInventory] = usePostAssetInventoryMutation();

  const [formType, setFormType] = useState<string>('');

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const submit = (data: any) => {
    AddInventory(data);
  };

  return {
    methods,
    submit,
    query,
    formType,
    setFormType,
  };
};
