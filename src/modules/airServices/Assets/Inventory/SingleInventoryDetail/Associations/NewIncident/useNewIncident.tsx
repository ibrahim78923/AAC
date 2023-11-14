import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './NewIncident.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { usePostCreateTicketMutation } from '@/services/airServices/example-folder/create-ticket';

export const useNewIncident = ({ onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;
  const [createTicketData] = usePostCreateTicketMutation();

  const onSubmit = async (data: any) => {
    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
    createTicketData(data);
  };
  return { handleSubmit, onSubmit, methods };
};
