import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultValues,
  overviewDataArray,
  validationSchema,
} from './SingleTaskDetail.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/tickets-tasks/slice';
import { useUpdateSingleServicesTasksByIdMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useSingleTaskDetail = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketTasks?.isPortalOpen,
  );

  const method = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(isPortalOpen?.data),
  });

  const { handleSubmit, reset } = method;

  const [patchMutation, { isLoading }] =
    useUpdateSingleServicesTasksByIdMutation();

  const overviewData = overviewDataArray(isPortalOpen?.data);

  const onSubmitDrawer = async (formData: any) => {
    const isDataNotChanged =
      formData?.status === isPortalOpen?.data?.status &&
      formData?.comments === isPortalOpen?.data?.comments;

    if (isDataNotChanged) {
      handleCloseDrawer?.();
      return;
    }
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
    dispatch(setIsPortalClose());
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
    overviewData,
    isPortalOpen,
  };
};
