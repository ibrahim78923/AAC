import { errorSnackbar, successSnackbar } from '@/utils/api';
import { defaultValues } from './TransactionFilter.data';
import { useForm } from 'react-hook-form';
import { useLazyGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';

export const useTransactionFilter = (props: any) => {
  const [triggerGetTransactionList, getTransactionListStatus] =
    useLazyGetTransactionListQuery();
  const { setOpenDrawer } = props;
  const handleCloseDrawer = () => {
    setOpenDrawer('');
  };
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
    handleCloseDrawer,
    methods,
    handleSubmit,
    onSubmit,
    getTransactionListStatus,
  };
};
