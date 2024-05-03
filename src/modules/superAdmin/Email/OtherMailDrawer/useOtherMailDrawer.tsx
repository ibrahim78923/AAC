import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  otherEmailDefaultValues,
  otherEmailValidationSchema,
} from './OtherMailDrawer.data';
import {
  useGetOtherMailDetailsQuery,
  usePostEmailConfigMutation,
  useUpdateEmailConfigMutation,
} from '@/services/commonFeatures/email';
import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/utils';
import { useEffect } from 'react';
import { DRAWER_TYPES } from '@/constants/strings';

const useOtherMailDrawer = ({ isOtherEmailDrawerType, setOpenDrawer }: any) => {
  const theme = useTheme();

  const [postEmailConfig, { isLoading: loadingPost }] =
    usePostEmailConfigMutation();
  const [updateEmailConfig, { isLoading: loadingUpdate }] =
    useUpdateEmailConfigMutation();

  const { user }: { user: any } = getSession();
  const {
    data: defaultMailData,
    status: isLoadingOtherDetails,
    refetch,
  } = useGetOtherMailDetailsQuery({
    params: {
      email: 'umarkhattab555@zohomail.com',
      userId: user?._id,
    },
  });

  const methodsOtherMail: any = useForm<any>({
    resolver: yupResolver(otherEmailValidationSchema),
    defaultValues: otherEmailDefaultValues(),
  });

  useEffect(() => {
    if (isOtherEmailDrawerType === DRAWER_TYPES?.EDIT) {
      if (defaultMailData) {
        methodsOtherMail.reset({
          email: defaultMailData?.data?.email ?? '',
          username: defaultMailData?.data?.username ?? '',
          password: defaultMailData?.data?.password ?? '',
          imapServerHost: defaultMailData?.data?.imapServerHost ?? '',
          imapServerPort: defaultMailData?.data?.imapServerPort ?? '',
          useSSL: defaultMailData?.defaultMailData?.useSSL ?? false,
          imapAuthenticationType:
            defaultMailData?.data?.imapAuthenticationType ?? '',
          smtpServerHost: defaultMailData?.data?.smtpServerHost ?? '',
          smtpServerPort: defaultMailData?.data?.smtpServerPort ?? '',
          securityMode: defaultMailData?.data?.securityMode ?? '',
          smtpAuthenticationType:
            defaultMailData?.data?.smtpAuthenticationType ?? '',
        });
      }
    } else {
      methodsOtherMail.reset({});
    }
  }, [isOtherEmailDrawerType, defaultMailData]);

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      createdBy: user?._id,
      ...(isOtherEmailDrawerType === DRAWER_TYPES?.ADD && {
        userId: user?._id,
      }),
    };

    if (isOtherEmailDrawerType === DRAWER_TYPES?.EDIT) {
      try {
        await updateEmailConfig({
          body: payload,
          id: defaultMailData?.data?._id,
        }).unwrap();
        enqueueSnackbar('Configuration updated successfully', {
          variant: 'success',
        });
        setOpenDrawer(false);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      try {
        await postEmailConfig({
          body: payload,
        })?.unwrap();
        enqueueSnackbar('Email Configuration successful', {
          variant: 'success',
        });
        setOpenDrawer(false);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };
  const { handleSubmit, reset } = methodsOtherMail;

  return {
    handleSubmit,
    onSubmit,
    methodsOtherMail,
    theme,
    loadingPost,
    loadingUpdate,
    reset,
    isLoadingOtherDetails,
    refetch,
  };
};
export default useOtherMailDrawer;
