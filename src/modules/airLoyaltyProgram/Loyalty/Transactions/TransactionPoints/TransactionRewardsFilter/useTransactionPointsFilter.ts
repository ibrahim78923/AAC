import { useForm } from 'react-hook-form';
import {
  filtersDefaultValues,
  pointsFilterFormFieldsDynamic,
} from './TransactionPointsFilter.data';
import { filteredEmptyValues } from '@/utils/api';
import { useLazyGetShopDropdownForLoyaltyTransactionQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';

export const useTransactionPointsFilter = (props: any) => {
  const { setIsDrawerOpen, isFilters, setIsFilter } = props;
  const methods: any = useForm({
    defaultValues: filtersDefaultValues?.(isFilters),
  });
  const { handleSubmit, reset } = methods;

  const submit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setIsFilter?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setIsFilter?.({});
    closeFilterForm?.();
  };

  const closeFilterForm = () => {
    reset?.();
    setIsDrawerOpen?.(false);
  };
  const shopApiQuery = useLazyGetShopDropdownForLoyaltyTransactionQuery?.();
  const transactionFilterFormFields =
    pointsFilterFormFieldsDynamic?.(shopApiQuery);
  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    transactionFilterFormFields,
  };
};
