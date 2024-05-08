import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './AddTranscation.data';
import { useForm } from 'react-hook-form';
import { usePostAddTransactionMutation } from '@/services/airLoyaltyProgram/giftCards/transactions';

export const useAddTransaction = (props: any) => {
  const { setOpenDrawer } = props;
  const handleCloseDrawer = () => {
    setOpenDrawer('');
  };
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const [postAddTransaction] = usePostAddTransactionMutation();
  const { handleSubmit, reset } = methods;
  const onSubmit = async (data: any) => {
    try {
      postAddTransaction(data);
      successSnackbar('Saved Successfully');
      reset();
    } catch (err) {
      errorSnackbar();
    }
  };
  return {
    handleCloseDrawer,
    methods,
    onSubmit,
    handleSubmit,
  };
};
