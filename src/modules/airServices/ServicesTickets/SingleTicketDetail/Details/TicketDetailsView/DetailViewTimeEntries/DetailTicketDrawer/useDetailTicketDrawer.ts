import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './DetailTicketDrawer.data';
import { useForm } from 'react-hook-form';

export const useDetailTicketDrawer = () => {
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
};
