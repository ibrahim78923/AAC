import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  getWorkloadDefaultValues,
  validationSchema,
  getWorkloadDataArray,
} from './UpdateWorkloadTask.data';
import { useEffect } from 'react';
import {
  useLazyGetAssignToQuery,
  useLazyGetDepartmentDropdownQuery,
} from '@/services/airServices/workload';

export const useUpdateWorkloadTask = ({ onClose, data }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: getWorkloadDefaultValues?.(data?.extendedProps?.data),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Task Updated Successfully', {
      variant: 'success',
    });
    onClose(false);
  };

  useEffect(() => {
    reset(getWorkloadDefaultValues?.(data?.extendedProps?.data));
  }, [data, reset]);

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryAssignTo = useLazyGetAssignToQuery();

  const workloadDataArray = getWorkloadDataArray({
    apiQueryDepartment,
    apiQueryAssignTo,
  });

  return { handleSubmit, onSubmit, methods, workloadDataArray };
};
