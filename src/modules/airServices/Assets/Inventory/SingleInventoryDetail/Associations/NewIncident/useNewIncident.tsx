import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './NewIncident.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

export const useNewIncident = ({ onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
  };
  return { handleSubmit, onSubmit, methods };
};
