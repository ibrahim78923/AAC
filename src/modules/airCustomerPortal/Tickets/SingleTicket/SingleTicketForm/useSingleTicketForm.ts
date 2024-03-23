import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { successSnackbar } from '@/utils/api';

export const useSingleTicketForm = () => {
  const methods: any = useForm({
    defaultValues: { yourReplay: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    successSnackbar('Your reply has been sent!');
    reset();
  };

  const theme = useTheme();
  return {
    methods,
    handleSubmit,
    onSubmit,
    theme,
  };
};
