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

  // Contacts Drawer
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const handleOpenContactsDrawer = () => {
    setIsAddContactDrawerOpen(true);
  };
  const handleCloseContactsDrawer = () => {
    setIsAddContactDrawerOpen(false);
  };

  return {
    theme,
    isAddContactDrawerOpen,
    handleOpenContactsDrawer,
    handleCloseContactsDrawer,
    handleCreateBroadcastSubmit,
    methods,
  };
};

export default useCreateBroadcast;
