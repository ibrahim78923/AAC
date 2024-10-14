import { errorSnackbar, successSnackbar } from '@/utils/api';
import { defaultValues } from './TransactionFilter.data';
import { useForm } from 'react-hook-form';
import { useLazyGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';

export const useTransactionFilter = () => {
  const [triggerGetTransactionList, getTransactionListStatus] =
    useLazyGetTransactionListQuery();

  const methods: any = useForm({
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (data: any) => {
    try {
      await triggerGetTransactionList(data)?.unwrap();
      successSnackbar('Saved Successfully');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    getTransactionListStatus,
  };
};
