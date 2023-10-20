import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AddInventory.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
const useEditInventory = () => {
  const { query }: any = useRouter();

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
  };
};
export default useEditInventory;
