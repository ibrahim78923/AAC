import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

export const useSingleTicketForm = ({
  singleTicketFormValidationSchema,
  singleTicketFormDefaultValues,
}: any) => {
  const methods: any = useForm({
    resolver: yupResolver(singleTicketFormValidationSchema),
    defaultValues: singleTicketFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('send Successfully!', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    reset(singleTicketFormDefaultValues);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
