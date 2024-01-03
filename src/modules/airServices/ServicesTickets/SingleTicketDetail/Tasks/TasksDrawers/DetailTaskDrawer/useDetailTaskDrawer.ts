import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './DetailTaskDrawer.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePatchTaskByIdMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';

export const useDetailTaskDrawer = (props: any) => {
  const { isDrawerOpen, taskDetail, onClose } = props;
  const method = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(taskDetail),
  });
  const { handleSubmit, reset } = method;
  const [patchMutation] = usePatchTaskByIdMutation();
  const onSubmitDrawer = async (data: any) => {
    try {
      const res: any = await patchMutation({
        data,
        id: taskDetail?._id,
      })?.unwrap();
      enqueueSnackbar(res?.message ?? 'Task updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      onClose(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  };
};
