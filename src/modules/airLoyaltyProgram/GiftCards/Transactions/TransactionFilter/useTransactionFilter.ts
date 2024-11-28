import { defaultValues } from './TransactionFilter.data';
import { useForm } from 'react-hook-form';
import { PAGINATION } from '@/config';

export const useTransactionFilter = (props: any) => {
  const { setOpenDrawer, filterValues, setFilterValues, setPage } = props;

  const methods: any = useForm({
    defaultValues: defaultValues(filterValues),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const transactionFiltered: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(transactionFiltered || {})?.length) {
      setFilterValues?.(transactionFiltered);
      onClose();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setFilterValues?.(transactionFiltered);
    setOpenDrawer?.(false);
  };

  const clearFilter = () => {
    reset?.();
    setFilterValues?.(null);
    setOpenDrawer?.(false);
  };

  const onClose = () => {
    reset?.();
    setOpenDrawer?.(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    clearFilter,
  };
};
