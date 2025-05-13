import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Typography, Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import {
  changePasswordDataArray,
  changePasswordDefaultValues,
  changePasswordValidationSchema,
  forgetPasswordDataArray,
  forgetPasswordDefaultValues,
  forgetPasswordValidationSchema,
} from './ForgetPassword.data';
import { LoginDashboardImage2 } from '@/assets/images';
import { styles } from './ForgetPassword.style';
import {
  useConfirmPasswordMutation,
  useForgotPasswordMutation,
} from '@/services/auth';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';

const ForgetPassword = () => {
  const [isEmailSuccess, setIsEmailSuccess] = useState<boolean>(false);
  const theme = useTheme();
  const router: any = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const forgetPasswordForm = useForm({
    resolver: yupResolver(forgetPasswordValidationSchema),
    defaultValues: forgetPasswordDefaultValues,
  });

  const onSubmit = async (values: any) => {
    const payload = {
      email: values?.email,
    };
    try {
      await forgotPassword(payload)?.unwrap();
      successSnackbar('Password reset email has been sent to registered email');
      setIsEmailSuccess(true);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      errorSnackbar(errMsg ?? 'Error occurred');
    }
  };

  const { handleSubmit } = forgetPasswordForm;

  const [ConfirmPassword, { isLoading: changePasswordLoading }] =
    useConfirmPasswordMutation();

  const changePasswordForm = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues: changePasswordDefaultValues,
  });

  const onSubmitChangePassword = async (values: any) => {
    try {
      await ConfirmPassword(values)?.unwrap();
      successSnackbar('Password reset successfully');
      router?.push('/login');
    } catch (error: any) {
      const errMsg = error?.data?.message;
      errorSnackbar(errMsg ?? 'Error occurred');
    }
  };

  const { handleSubmit: handleChangeSubmit } = changePasswordForm;

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles.AuthHeader}>
        <Box>
          <LogoAvatar />
        </Box>
        <Box>
          <Link href="/login" variant="contained">
            Sign In
          </Link>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ height: '100vh', alignItems: 'center' }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Box
            className="form-styled"
            sx={{ width: { md: '60%', sm: '70%', xs: '90%' }, margin: 'auto' }}
          >
            <Typography
              variant="h3"
              sx={{ color: theme?.palette?.grey[500_8], textAlign: 'center' }}
            >
              {!isEmailSuccess ? 'Forgot' : 'Set'} Password{' '}
            </Typography>
            {!isEmailSuccess && (
              <Typography
                variant="h6"
                sx={{
                  color: theme?.palette?.grey[900],
                  textAlign: 'center',
                }}
              >
                Let’s Get Start Enter the email associated with your account and
                we’ll send an email with instructions to reset your password!
              </Typography>
            )}

            <Box style={styles.formStyling}>
              {isEmailSuccess ? (
                <>
                  <FormProvider
                    methods={changePasswordForm}
                    onSubmit={handleChangeSubmit(onSubmitChangePassword)}
                  >
                    <Grid container spacing={4}>
                      {changePasswordDataArray?.map((item: any) => (
                        <Grid
                          item
                          xs={12}
                          md={item?.md}
                          key={uuidv4()}
                          sx={{ paddingTop: '15px !important' }}
                        >
                          <item.component
                            {...item.componentProps}
                            size={'small'}
                          ></item.component>
                        </Grid>
                      ))}
                    </Grid>

                    <LoadingButton
                      type="submit"
                      variant="contained"
                      sx={{ marginTop: '15px', width: '100%' }}
                      loading={changePasswordLoading}
                    >
                      Continue
                    </LoadingButton>
                  </FormProvider>
                </>
              ) : (
                <>
                  <FormProvider
                    methods={forgetPasswordForm}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid container spacing={4}>
                      {forgetPasswordDataArray?.map((item: any) => (
                        <Grid item xs={12} md={item?.md} key={uuidv4()}>
                          <item.component
                            {...item.componentProps}
                            size={'small'}
                          ></item.component>
                        </Grid>
                      ))}
                    </Grid>

                    <LoadingButton
                      type="submit"
                      variant="contained"
                      sx={{ marginTop: '30px', width: '100%' }}
                      loading={isLoading}
                    >
                      Continue
                    </LoadingButton>
                  </FormProvider>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          lg={6}
          style={styles.loginDashboard}
          sx={{
            '@media (max-width: 900px)': {
              display: 'none !important', // Hide the element when the screen width is less than 900px
            },
          }}
        >
          <Image
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '#00000030 0px 0px 20px 1px',
            }}
            src={LoginDashboardImage2}
            alt="dashborad"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ForgetPassword;
