import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema, defaultValues } from './ContractsExtend.data';

export default function useContractsActionExtend() {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
}
