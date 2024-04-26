import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertLoyaltyTransactionsDefaultValues,
  upsertLoyaltyTransactionsFormFieldsDynamic,
  upsertLoyaltyTransactionsValidationSchema,
} from './UpsertTransactions.data';
import {
  useLazyGetShopDropdownForLoyaltyTransactionQuery,
  usePostLoyaltyTransactionsMutation,
} from '@/services/airLoyaltyProgram/loyalty/transactions';
import { successSnackbar } from '@/utils/api';

export const useUpsertTransactions = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [postLoyaltyTransactionsTrigger, postLoyaltyTransactionsStatus] =
    usePostLoyaltyTransactionsMutation?.();

  const methods: any = useForm({
    resolver: yupResolver(upsertLoyaltyTransactionsValidationSchema),
    defaultValues: upsertLoyaltyTransactionsDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const submitUpsertLoyaltyTransactions = async (data: any) => {
    const apiDataParameter = {
      body: data,
    };
    try {
      await postLoyaltyTransactionsTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('');
      closeLoyaltyTransactionForm?.();
    } catch (error) {}
  };

  const closeLoyaltyTransactionForm = () => {
    setIsDrawerOpen({});
    reset();
  };

  const shopApiQuery = useLazyGetShopDropdownForLoyaltyTransactionQuery?.();
  const transactionFilterFormFields =
    upsertLoyaltyTransactionsFormFieldsDynamic?.(shopApiQuery);

  return {
    methods,
    handleSubmit,
    submitUpsertLoyaltyTransactions,
    transactionFilterFormFields,
    closeLoyaltyTransactionForm,
    postLoyaltyTransactionsStatus,
  };
};
