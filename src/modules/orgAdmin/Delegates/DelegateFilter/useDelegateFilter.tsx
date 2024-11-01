import { useForm } from 'react-hook-form';
import { delegateFilterDefaultValues } from './DelegateFilter.data';
import { filteredEmptyValues } from '@/utils/api';

const useDelegateFilter = (setFilterValue: any) => {
  const methods = useForm({
    defaultValues: delegateFilterDefaultValues({}),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterValue(filterValues);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useDelegateFilter;
