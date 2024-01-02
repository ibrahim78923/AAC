import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './DetailTaskDrawer.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDetailTaskDrawer = (props: any) => {
  const { isDrawerOpen, taskDetail, onClose } = props;
  const method = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(taskDetail),
  });
  const { handleSubmit, reset } = method;
  const onSubmitDrawer = () => {
    enqueueSnackbar('Task updated successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    onClose(false);
  };
  useEffect(() => {
    reset(defaultValues(taskDetail));
  }, [isDrawerOpen]);
  const theme = useTheme();
  return {
    method,
    handleSubmit,
    onSubmitDrawer,
    theme,
  };
};
