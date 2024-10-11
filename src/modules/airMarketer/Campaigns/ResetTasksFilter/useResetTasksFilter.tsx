import { useForm } from 'react-hook-form';
import { defaultValues } from './ResetTaskFilter.data';
import { filteredEmptyValues } from '@/utils/api';
import { useState } from 'react';

const useResetTasksFilter = () => {
  const [isFilters, setIsFilters] = useState(false);
  const [taskFilters, setTaskFilters] = useState<any>({
    campaignId: '',
    assignedTo: '',
    status: '',
    taskType: '',
  });

  const methods: any = useForm({
    defaultValues: defaultValues(taskFilters),
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    setIsFilters(false);
    values.campaignId = values?.campaignId?._id;
    values.assignedTo = values?.assignedTo?._id;
    const filterValues = filteredEmptyValues?.(values);
    setTaskFilters(filterValues);
  };

  const reset = () => {
    setTaskFilters({
      campaignId: null,
      assignedTo: null,
      status: '',
      taskType: '',
    });
  };

  return {
    setTaskFilters,
    setIsFilters,
    handleSubmit,
    taskFilters,
    isFilters,
    onSubmit,
    methods,
    reset,
  };
};
export default useResetTasksFilter;
