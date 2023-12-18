import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useForm } from 'react-hook-form';
import { filtersFormFieldsDefaultValues } from './Filters.data';
import { enqueueSnackbar } from 'notistack';

export const useFilters = (props: any) => {
  const { filtersOpen, setFiltersOpen } = props;
  const methods: any = useForm({
    defaultValues: filtersFormFieldsDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitFiltersForm = async () => {
    enqueueSnackbar('Filters Applied', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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
