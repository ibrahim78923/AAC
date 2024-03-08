import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  accountDetailProfileValidationSchema,
  accountDetailProfileDefaultValues,
} from './AccountDetailsProfile.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetProfileDetailQuery } from '@/services/airServices/settings/account-settings/account-details';
import useAuth from '@/hooks/useAuth';

export const useAccountDetailsProfile = () => {
  const user = useAuth();
  const userId = user?.user?._id;
  const { data } = useGetProfileDetailQuery(userId);
  const profileDetail = data?.data;

  const AccountDetailProfileMethods = useForm({
    resolver: yupResolver(accountDetailProfileValidationSchema),
    defaultValues: accountDetailProfileDefaultValues(profileDetail),
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
