import { useFormLib } from '@/hooks/useFormLib';
import {
  filtersDefaultValues,
  rewardsFilterFormFieldsDynamic,
} from './TransactionRewardsFilter.data';
import {
  useLazyGetConsumerDropdownTransactionQuery,
  useLazyGetRewardsDropdownTransactionQuery,
} from '@/services/airLoyaltyProgram/loyalty/transactions';

export const useTransactionRewardsFilter = (props: any) => {
  const { setIsDrawerOpen, isFilter, setIsFilter } = props;
  const { methods, handleSubmit, reset }: any = useFormLib({
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
  const rewardsApiQuery = useLazyGetRewardsDropdownTransactionQuery?.();
  const consumerApiQuery = useLazyGetConsumerDropdownTransactionQuery?.();
  const transactionFilterFormFields = rewardsFilterFormFieldsDynamic?.(
    consumerApiQuery,
    rewardsApiQuery,
  );
  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    transactionFilterFormFields,
  };
};
