import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getWorkloadDefaultValues,
  getWorkloadValidationSchema,
  getWorkloadDataArray,
} from './UpdateWorkloadTask.data';
import { useEffect } from 'react';
import {
  useLazyGetAllUsersInWorkloadQuery,
  usePatchTaskMutation,
} from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpdateWorkloadTask = ({ onClose, dataGet }: any) => {
  const [patchTaskTrigger, patchTaskStatus] = usePatchTaskMutation();

  const methods: any = useForm({
    resolver: yupResolver(getWorkloadValidationSchema),
    defaultValues: getWorkloadDefaultValues?.(dataGet?.extendedProps),
  });

  const { handleSubmit, reset, getValues } = methods;

  const onSubmit = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

    try {
      const queryParams = {
        id: dataGet?.extendedProps?._id,
        description: data?.description,
        assignTo: data?.assignTo?._id,
        status: data?.status,
        startDate: data?.startDate?.toISOString(),
        endDate: data?.endDate?.toISOString(),
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

  const apiQueryAssignTo = useLazyGetAllUsersInWorkloadQuery();

  const workloadDataArray = getWorkloadDataArray({
    apiQueryAssignTo,
  });

  return {
    handleSubmit,
    onSubmit,
    methods,
    workloadDataArray,
    patchTaskStatus,
  };
};
