import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  otherEmailDefaultValues,
  otherEmailValidationSchema,
} from './OtherMailDrawer.data';
import { usePostEmailConfigMutation } from '@/services/commonFeatures/email';
import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/utils';

const useOtherMailDrawer = () => {
  const theme = useTheme();

  const [postEmailConfig, { isLoading: loadingPost }] =
    usePostEmailConfigMutation();

  const methodsOtherMail: any = useForm({
    resolver: yupResolver(otherEmailValidationSchema),
    defaultValues: otherEmailDefaultValues,
  });

  const { user }: { user: any } = getSession();

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      createdBy: user?._id,
      userId: user?._id,
    };
    try {
      await postEmailConfig({
        body: payload,
      }).unwrap();
      enqueueSnackbar('Email Configuration successful', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };
  const { handleSubmit } = methodsOtherMail;

  return {
    handleSubmit,
    onSubmit,
    methodsOtherMail,
    theme,
    loadingPost,
  };
};
export default useOtherMailDrawer;
