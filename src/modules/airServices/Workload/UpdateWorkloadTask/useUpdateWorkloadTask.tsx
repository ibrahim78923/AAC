import {
  getWorkloadDataArray,
  getWorkloadDefaultValues,
  getWorkloadValidationSchema,
} from './UpdateWorkloadTask.data';
import { useEffect } from 'react';
import { usePatchAirServicesWorkloadTaskMutation } from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpdateWorkloadTask = ({ onClose, dataGet }: any) => {
  const [patchTaskTrigger, patchTaskStatus] =
    usePatchAirServicesWorkloadTaskMutation();

  const workloadTaskMethodProps = {
    validationSchema: getWorkloadValidationSchema,
    defaultValues: getWorkloadDefaultValues?.(dataGet?.extendedProps),
  };

  const { handleSubmit, reset, getValues, setValue, setError, watch, methods } =
    useFormLib(workloadTaskMethodProps);

  const onSubmit = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      setError('plannedEffort', {
        message:
          'Invalid format for Planned Effort. Please use format like 1h10m',
      });
      return;
    }

    try {
      const queryParams = {
        id: dataGet?.extendedProps?._id,
        description: data?.description,
        assignTo: data?.assignTo?._id,
        status: data?.status,
        startDate: isoDateString(data?.startDate),
        endDate: isoDateString(data?.endDate),
        plannedEffort: data?.plannedEffort,
      };

      const patchTaskParameter = {
        queryParams,
      };

      await patchTaskTrigger(patchTaskParameter)?.unwrap();
      successSnackbar('Task Updated Successfully');
      onClose(false);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  useEffect(() => {
    reset(getWorkloadDefaultValues?.(dataGet?.extendedProps));
  }, [dataGet, reset]);

  const workloadDataArray = getWorkloadDataArray(getValues, setValue, watch);

  return {
    handleSubmit,
    onSubmit,
    methods,
    patchTaskStatus,
    workloadDataArray,
  };
};
