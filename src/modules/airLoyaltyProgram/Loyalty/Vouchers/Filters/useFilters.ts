import { useForm } from 'react-hook-form';
import { filtersFormFieldsDefaultValues } from './Filters.data';
import { successSnackbar } from '@/utils/api';

export const useFilters = (props: any) => {
  const { filtersOpen, setFiltersOpen } = props;
  const methods: any = useForm({
    defaultValues: filtersFormFieldsDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitFiltersForm = async () => {
    successSnackbar('Filters Applied!');
    setFiltersOpen?.(false);
  };
  return {
    filtersOpen,
    setFiltersOpen,
    handleSubmit,
    submitFiltersForm,
    methods,
  };
};
