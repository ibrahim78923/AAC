import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './DetailTaskDrawer.data';
import { usePatchTaskByIdMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDetailTaskDrawer = (props: any) => {
  const { isDrawerOpen, taskDetail, onClose } = props;
  const method = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(taskDetail),
  });
  const { handleSubmit, reset } = method;
  const [patchMutation, { isLoading }] = usePatchTaskByIdMutation();
  const onSubmitDrawer = async (data: any) => {
    try {
      await patchMutation({
        data,
        id: taskDetail?._id,
      })?.unwrap();
      successSnackbar('Task updated successfully');
      onClose(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
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
    isLoading,
  };
};
