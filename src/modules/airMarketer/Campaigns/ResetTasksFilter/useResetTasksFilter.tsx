import { useForm } from 'react-hook-form';
import { defaultValues } from './ResetTaskFilter.data';
import { filteredEmptyValues } from '@/utils/api';

const useResetTasksFilter = (setTaskFilters: any, setIsFiltersOpen: any) => {
  const methods: any = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    setIsFiltersOpen(false);
    values.campaignId = values.campaignId?._id;
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
