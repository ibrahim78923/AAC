import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useRef } from 'react';
import { useTheme } from '@mui/material';

export const useSingleTicketForm = () => {
  const methods: any = useForm({
    defaultValues: { yourReplay: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Your reply has been sent!', {
      variant: 'success',
    });
    reset();
  };

  const fileImport: any = useRef();
  const handleImport = () => {
    fileImport?.current?.click();
  };
  const theme = useTheme();
  return {
    methods,
    handleSubmit,
    onSubmit,
    fileImport,
    handleImport,
    theme,
  };
};
