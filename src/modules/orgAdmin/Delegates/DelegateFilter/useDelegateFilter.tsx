import { useForm } from 'react-hook-form';
import { delegateFilterDefaultValues } from './DelegateFilter.data';
import { filteredEmptyValues } from '@/utils/api';

const useDelegateFilter = (
  filterValue: any,
  setFilterValue: any,
  setIsFilterDrawer: any,
) => {
  const methods = useForm({
    defaultValues: delegateFilterDefaultValues(filterValue),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterValue(filterValues);
    setIsFilterDrawer(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useDelegateFilter;
