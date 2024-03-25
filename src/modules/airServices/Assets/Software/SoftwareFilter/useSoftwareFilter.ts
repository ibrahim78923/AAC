import { useForm } from 'react-hook-form';
import { softwareFilterDefaultValues } from './SoftwareFilter.data';

export const useSoftwareFilter = (props: any) => {
  const { setIsOpenFilterDrawer, setFilterValues, filterValues, setPage } =
    props;

  const methods = useForm({
    defaultValues: softwareFilterDefaultValues(filterValues),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
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
    setIsOpenFilterDrawer?.(false);
  };

  const clearFilter = () => {
    reset?.();
    setFilterValues?.(null);
    setIsOpenFilterDrawer?.(false);
  };

  const onClose = () => {
    reset?.();
    setIsOpenFilterDrawer?.(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    clearFilter,
    onClose,
  };
};
