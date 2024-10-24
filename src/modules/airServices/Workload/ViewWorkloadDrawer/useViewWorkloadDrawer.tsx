import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePatchAirServicesWorkloadTaskMutation } from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  defaultValues,
  overviewDataArray,
  validationSchema,
} from './ViewWorkloadDrawer.data';

export default function useViewWorkloadDrawer({ onClose, dataGet }: any) {
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(dataGet?.extendedProps),
  });

  const { handleSubmit } = methods;

  const [patchTaskTrigger, patchTaskStatus] =
    usePatchAirServicesWorkloadTaskMutation();

  const overviewData = overviewDataArray(dataGet?.extendedProps);

  const onSubmit = async (formData: any) => {
    delete formData?.ticketId;
    const queryParams = {
      ...formData,
      id: dataGet?.extendedProps?._id,
    };
    const apiDataParameter = {
      queryParams,
    };

    try {
      await patchTaskTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Task updated successfully');
      onClose?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    theme,
    handleSubmit,
    onSubmit,
    methods,
    patchTaskStatus,
    overviewData,
  };
}
