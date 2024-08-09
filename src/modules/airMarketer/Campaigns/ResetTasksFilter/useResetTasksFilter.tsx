import { useForm } from 'react-hook-form';
import { defaultValues } from './ResetTaskFilter.data';
import { filteredEmptyValues } from '@/utils/api';
import { TaskFiltersI } from './ResetTaskFilters.interface';

const useResetTasksFilter = (
  setTaskFilters: (value: TaskFiltersI) => void,
  setIsFiltersOpen: (value: boolean) => void,
) => {
  const methods: any = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    setIsFiltersOpen(false);
    values.campaignId = values?.campaignId?._id;
    values.assignedTo = values?.assignedTo?._id;
    const filterValues = filteredEmptyValues?.(values);
    setTaskFilters(filterValues);
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
  };
};
export default useResetTasksFilter;
