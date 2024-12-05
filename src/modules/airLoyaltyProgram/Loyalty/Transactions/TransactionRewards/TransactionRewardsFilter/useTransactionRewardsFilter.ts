import { useForm } from 'react-hook-form';
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
