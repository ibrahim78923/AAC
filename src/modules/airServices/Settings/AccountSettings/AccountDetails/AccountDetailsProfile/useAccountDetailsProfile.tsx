import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  accountDetailProfileValidationSchema,
  accountDetailProfileDefaultValues,
} from './AccountDetailsProfile.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAccountDetailsProfile = () => {
  const AccountDetailProfileMethods = useForm({
    resolver: yupResolver(accountDetailProfileValidationSchema),
    defaultValues: accountDetailProfileDefaultValues,
  });

  const isSubmit = async () => {
    enqueueSnackbar('Account Details Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };

  const { handleSubmit, reset } = AccountDetailProfileMethods;
  const handleSubmitAccountDetailProfile = handleSubmit(isSubmit);

  return {
    AccountDetailProfileMethods,
    reset,
    handleSubmitAccountDetailProfile,
  };
};
