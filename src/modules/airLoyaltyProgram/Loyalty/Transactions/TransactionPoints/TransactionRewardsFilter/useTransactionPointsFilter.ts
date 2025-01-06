import {
  filtersDefaultValues,
  pointsFilterFormFieldsDynamic,
} from './TransactionPointsFilter.data';
import { useLazyGetConsumerDropdownTransactionQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';
import { useFormLib } from '@/hooks/useFormLib';

export const useTransactionPointsFilter = (props: any) => {
  const { setIsDrawerOpen, isFilter, setIsFilter } = props;
  const { methods, handleSubmit, reset } = useFormLib({
    defaultValues: filtersDefaultValues?.(isFilter),
  });

  const submit = async (data: any) => {
    setIsFilter?.(data);
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
  const consumerApiQuery = useLazyGetConsumerDropdownTransactionQuery?.();
  const transactionFilterFormFields =
    pointsFilterFormFieldsDynamic?.(consumerApiQuery);
  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    transactionFilterFormFields,
  };
};
