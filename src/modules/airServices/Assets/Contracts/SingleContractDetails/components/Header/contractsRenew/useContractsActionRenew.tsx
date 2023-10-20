import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema, defaultValues } from './ContractsRenew.data';

export default function useContractsActionRenew() {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    // console.log(data);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
}
