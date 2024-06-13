import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './DetailTaskDrawer.data';
import { usePatchTaskByIdMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDetailTaskDrawer = (props: any) => {
  const { setIsPortalOpen, setSelectedTasksLists, isPortalOpen } = props;

  const method = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(isPortalOpen?.data),
  });

  const { handleSubmit, reset } = method;

  const [patchMutation, { isLoading }] = usePatchTaskByIdMutation();

  const onSubmitDrawer = async (formData: any) => {
    delete formData?.ticketId;
    const queryParams = {
      ...formData,
      id: isPortalOpen?.data?._id,
    };
    const apiDataParameter = {
      queryParams,
    };

    try {
      await patchMutation(apiDataParameter)?.unwrap();
      successSnackbar('Task updated successfully');
      handleCloseDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleCloseDrawer = () => {
    setIsPortalOpen({});
    setSelectedTasksLists?.([]);
    reset();
  };

  const theme = useTheme();

  return {
    method,
    handleSubmit,
    onSubmitDrawer,
    theme,
    isLoading,
    handleCloseDrawer,
  };
};
