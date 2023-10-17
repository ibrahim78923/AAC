import { defaultValues, validationSchema } from './DetailForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function useDetailForm() {
  const methodsContractForm = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = () => {};
  return {
    methodsContractForm,
    validationSchema,
    defaultValues,
    onSubmit,
  };
}
