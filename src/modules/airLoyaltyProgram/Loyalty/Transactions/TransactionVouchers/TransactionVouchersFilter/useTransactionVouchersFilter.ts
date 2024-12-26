import {
  filtersDefaultValues,
  vouchersFilterFormFieldsDynamic,
} from './TransactionVouchersFilter.data';
import {
  useLazyGetConsumerDropdownTransactionQuery,
  useLazyGetVouchersDropdownTransactionQuery,
} from '@/services/airLoyaltyProgram/loyalty/transactions';
import { useFormLib } from '@/hooks/useFormLib';

export const useTransactionVouchersFilter = (props: any) => {
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
  const voucherApiQuery = useLazyGetVouchersDropdownTransactionQuery?.();
  const transactionFilterFormFields = vouchersFilterFormFieldsDynamic?.(
    consumerApiQuery,
    voucherApiQuery,
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
