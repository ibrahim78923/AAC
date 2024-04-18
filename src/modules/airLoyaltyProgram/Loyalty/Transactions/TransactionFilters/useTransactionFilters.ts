import { useForm } from 'react-hook-form';
import {
  filtersDefaultValues,
  transactionFilterFormFieldsDynamic,
} from './TransactionFilters.data';
import { filteredEmptyValues } from '@/utils/api';
import { useLazyGetShopDropdownForLoyaltyTransactionQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';

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
  const shopApiQuery = useLazyGetShopDropdownForLoyaltyTransactionQuery?.();
  const transactionFilterFormFields =
    transactionFilterFormFieldsDynamic?.(shopApiQuery);
  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    transactionFilterFormFields,
  };
};
