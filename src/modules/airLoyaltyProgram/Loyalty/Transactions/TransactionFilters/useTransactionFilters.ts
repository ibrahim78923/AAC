import { useForm } from 'react-hook-form';
import { filtersDefaultValues } from './TransactionFilters.data';
import { filteredEmptyValues } from '@/utils/api';

export const useTransactionFilters = (props: any) => {
  const { setIsDrawerOpen, transactionFilters, setTransactionsFilter } = props;
  const methods: any = useForm({
    defaultValues: filtersDefaultValues?.(transactionFilters),
  });
  const { handleSubmit, reset } = methods;

  const submit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setTransactionsFilter?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setTransactionsFilter?.({});
    closeFilterForm?.();
  };

  const closeFilterForm = () => {
    reset?.();
    setIsDrawerOpen?.({});
  };

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
  };
};
