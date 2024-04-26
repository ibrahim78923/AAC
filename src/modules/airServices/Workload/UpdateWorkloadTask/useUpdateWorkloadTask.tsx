import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getWorkloadDefaultValues,
  validationSchema,
  getWorkloadDataArray,
} from './UpdateWorkloadTask.data';
import { useEffect } from 'react';
import {
  useLazyGetAssignToAgentsQuery,
  useLazyGetDepartmentDropdownQuery,
  usePatchTaskMutation,
} from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpdateWorkloadTask = ({ onClose, dataGet }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: getWorkloadDefaultValues?.(dataGet?.extendedProps?.data),
  });

  const { handleSubmit, reset, getValues } = methods;

  const [patchTaskTrigger, patchTaskStatus] = usePatchTaskMutation();

  const onSubmit = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

    const patchTaskParameter = {
      data: {
        ...data,
        startDate: data?.startDate?.toISOString(),
        endDate: data?.endDate?.toISOString(),
        assignTo: data?.assignTo?._id,
        departmentId: data?.departmentId?._id,
      },
      id: dataGet?.extendedProps?.data?._id,
    };

    try {
      await patchTaskTrigger(patchTaskParameter)?.unwrap();
      successSnackbar('Task Updated Successfully');
      onClose(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose(false);
    }
  };

  useEffect(() => {
    reset(getWorkloadDefaultValues?.(dataGet?.extendedProps?.data));
  }, [dataGet, reset]);

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryAssignTo = useLazyGetAssignToAgentsQuery();

  const workloadDataArray = getWorkloadDataArray({
    apiQueryDepartment,
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
