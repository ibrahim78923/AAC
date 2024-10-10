import { useForm } from 'react-hook-form';
import { softwareFilterDefaultValues } from './SoftwareFilter.data';
import {
  SoftwareFilterI,
  SoftwareFilterValues,
} from './SoftwareFilter.interface';
import { PAGINATION } from '@/config';

export const useSoftwareFilter = (props: SoftwareFilterI) => {
  const { setIsOpenFilterDrawer, setFilterValues, filterValues, setPage } =
    props;

  const methods = useForm({
    defaultValues: softwareFilterDefaultValues(filterValues),
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (data: SoftwareFilterValues) => {
    const softwareFiltered = Object?.entries(data || {})
      ?.filter(
        ([, value]) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(softwareFiltered || {})?.length) {
      setFilterValues?.(softwareFiltered);
      onClose();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setFilterValues?.(softwareFiltered);
    setIsOpenFilterDrawer?.(false);
  };

  const clearFilter = () => {
    reset?.();
    setFilterValues?.({});
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
