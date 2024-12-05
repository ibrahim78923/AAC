import { useForm } from 'react-hook-form';
import {
  filtersDefaultValues,
  pointsFilterFormFieldsDynamic,
} from './TransactionPointsFilter.data';
import { useLazyGetConsumerDropdownTransactionQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';

export const useTransactionPointsFilter = (props: any) => {
  const { setIsDrawerOpen, isFilter, setIsFilter } = props;
  const methods: any = useForm({
    defaultValues: filtersDefaultValues?.(isFilter),
  });
  const { handleSubmit, reset } = methods;

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
