import { useForm } from 'react-hook-form';
import {
  filtersDefaultValues,
  vouchersFilterFormFieldsDynamic,
} from './TransactionVouchersFilter.data';
import {
  useLazyGetConsumerDropdownTransactionQuery,
  useLazyGetVouchersDropdownTransactionQuery,
} from '@/services/airLoyaltyProgram/loyalty/transactions';

export const useTransactionVouchersFilter = (props: any) => {
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
