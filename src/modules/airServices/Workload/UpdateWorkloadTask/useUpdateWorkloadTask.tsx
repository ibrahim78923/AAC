import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { validationSchema } from './UpdateWorkloadTask.data';

export const useUpdateWorkloadTask = ({ onClose, initialValueProps }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
    onClose(false);
  };
  return { handleSubmit, onSubmit, methods };
};
