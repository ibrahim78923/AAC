import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './CreateBroadcast.data';

const useCreateBroadcast = () => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onBroadcastSubmit = async () => {
    reset();
  };
  const handleCreateBroadcastSubmit = handleSubmit(onBroadcastSubmit);
  const theme = useTheme<Theme>();
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);

  return {
    theme,
    isAddContactDrawerOpen,
    setIsAddContactDrawerOpen,

    handleCreateBroadcastSubmit,
    methods,
  };
};

export default useCreateBroadcast;
