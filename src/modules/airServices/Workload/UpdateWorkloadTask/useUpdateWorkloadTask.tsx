import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getWorkloadDefaultValues,
  validationSchema,
  getWorkloadDataArray,
} from './UpdateWorkloadTask.data';
import { useEffect } from 'react';
import {
  useLazyGetAssignToQuery,
  useLazyGetDepartmentDropdownQuery,
  usePatchTaskMutation,
} from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpdateWorkloadTask = ({ onClose, dataGet }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: getWorkloadDefaultValues?.(dataGet?.extendedProps?.data),
  });

  const { handleSubmit, reset } = methods;

  const [patchTaskTrigger] = usePatchTaskMutation();

  const onSubmit = async (data: any) => {
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
    } catch (error) {
      errorSnackbar();
      onClose(false);
    }
  };

  useEffect(() => {
    reset(getWorkloadDefaultValues?.(dataGet?.extendedProps?.data));
  }, [dataGet, reset]);

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryAssignTo = useLazyGetAssignToQuery();

  const workloadDataArray = getWorkloadDataArray({
    apiQueryDepartment,
    apiQueryAssignTo,
  });

  return { handleSubmit, onSubmit, methods, workloadDataArray };
};
