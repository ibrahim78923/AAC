import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useRef } from 'react';

export const useSingleTicketForm = (props: any) => {
  const { singleTicketFormDefaultValues, singleTicketFormValidationSchema } =
    props;
  const methods: any = useForm({
    resolver: yupResolver(singleTicketFormValidationSchema),
    defaultValues: singleTicketFormDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Your reply has been sent!', {
      variant: 'success',
    });
    reset(singleTicketFormDefaultValues);
  };

  const fileImport: any = useRef();
  const handleImport = () => {
    fileImport?.current?.click();
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    fileImport,
    handleImport,
  };
};
