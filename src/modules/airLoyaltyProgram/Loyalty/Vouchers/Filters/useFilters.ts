import { useForm } from 'react-hook-form';
import { filtersFormFieldsDefaultValues } from './Filters.data';

export const useFilters = (props: any) => {
  const {
    filtersOpen,
    setFiltersOpen,
    setFilterValues,
    filterValues,
    setPage,
  } = props;

  const methods: any = useForm({
    defaultValues: filtersFormFieldsDefaultValues(filterValues),
  });
  const { handleSubmit, reset } = methods;

  const submitFiltersForm = async (data: any) => {
    const softwareFiltered: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(softwareFiltered || {})?.length) {
      setFilterValues?.(softwareFiltered);
      onClose();
      return;
    }
    setPage?.(1);
    setFilterValues?.(softwareFiltered);
    setFiltersOpen?.({});
  };

  const clearFilter = () => {
    reset?.();
    setFilterValues?.(null);
    setFiltersOpen?.({});
  };
  const onClose = () => {
    reset?.();
    setFiltersOpen?.({});
  };
  return {
    filtersOpen,
    setFiltersOpen,
    handleSubmit,
    submitFiltersForm,
    methods,
    clearFilter,
    onClose,
  };
};
