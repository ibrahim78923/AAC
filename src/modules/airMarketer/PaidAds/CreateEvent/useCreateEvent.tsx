import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventDefaultValues, eventValidationSchema } from './CreateEvent.data';

const useCreateEvent = () => {
  const theme = useTheme();

  const methods: any = useForm({
    resolver: yupResolver(eventValidationSchema),
    defaultValues: eventDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const checkboxVal = watch('eventTrigger');
  const marketingRadio = watch('triggerRadio');

  const onSubmit = async (data: any) => {
    alert(data);
  };

  return {
    theme,
    onSubmit,
    checkboxVal,
    handleSubmit,
    methods,
    marketingRadio,
  };
};

export default useCreateEvent;
