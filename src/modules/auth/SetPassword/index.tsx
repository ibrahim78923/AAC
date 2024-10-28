import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  resetPasswordDataArray,
  resetPasswordDefaultValues,
  resetPasswordValidationSchema,
} from './SetPassword.data';
import resetPasswordSuccess from '@/assets/icons/shared/onSuccess.gif';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './SetPassword.style';
import { useSetPasswordMutation } from '@/services/auth';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AUTH } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { getSession } from '@/utils';
import useAuth from '@/hooks/useAuth';

const SetPassword = () => {
  const [isMatchPassword, setIsMatchPassword] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const { logout } = useAuth();

  const resetPasswordForm = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: resetPasswordDefaultValues,
  });
  const session: any = getSession();

  const [setPassword, { isLoading: changePasswordLoading }] =
    useSetPasswordMutation();

  const handleLogout = async () => {
    await logout();
    router.push(AUTH?.LOGIN);
  };

  const onSubmit = async (data: any) => {
    const { newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      setIsMatchPassword(true);
    } else {
      const payload = {
        email: session?.user?.email,
        password: newPassword,
        role: session?.user?.role,
        session: session?.session,
      };
      setIsMatchPassword(false);
      try {
        await setPassword(payload)?.unwrap();
        enqueueSnackbar('Password Change Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });

        reset();
        setIsSuccess(true);
        // router.push(AUTH?.LOGIN);
        handleLogout();
      } catch (error: any) {
        const errMsg = error?.data?.message;
        const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
        enqueueSnackbar(errMessage ?? 'Error occurred', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    }
  };

  // const { handleSubmit, reset } = profileSecurityForm;
  // const onSubmit = async (values: any) => {
  //   const payload = {
  //     currentPassword: values.CurrentPassword,
  //     newPassword: values.newPassword,
  //   };
  //   try {
  //     await changePassword(payload)?.unwrap();
  //     enqueueSnackbar('Password Change Successfully', {
  //       variant: NOTISTACK_VARIANTS?.SUCCESS,
  //     });

  //     reset();
  //     handleLogout();
  //   } catch (error: any) {
  //     const errMsg = error?.data?.message;
  //     const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
  //     enqueueSnackbar(errMessage ?? 'Error occurred', {
  //       variant: NOTISTACK_VARIANTS?.ERROR,
  //     });
  //   }
  // };

  const { handleSubmit, reset } = resetPasswordForm;

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles.AuthHeader}>
        <Box>
          <CompanyLogoIcon />
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
            {!isSuccess && (
              <Typography
                variant="h3"
                sx={{ textAlign: 'center', color: theme?.palette?.grey[500_8] }}
              >
                Set Password
              </Typography>
            )}

            <Box style={styles.formStyling}>
              {isSuccess ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: '15px',
                      color: theme?.palette?.grey[500_8],
                    }}
                  >
                    Set Password
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      src={resetPasswordSuccess}
                      alt="successIcon"
                      style={{ width: '170px', height: '170px' }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      marginTop: '15px',
                      color: theme?.palette?.grey[500_8],
                    }}
                  >
                    {' '}
                    Password reset email has been sent to registered email.{' '}
                  </Typography>
                </Box>
              ) : (
                <>
                  <FormProvider
                    methods={resetPasswordForm}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid container spacing={4}>
                      {resetPasswordDataArray?.map((item: any) => (
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
                    {isMatchPassword && (
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        password not match
                      </Typography>
                    )}
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      sx={{ marginY: '30px', width: '100%' }}
                      loading={changePasswordLoading}
                    >
                      Set Password
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
          <Image src={LoginDashboardImage} alt="dashborad" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default SetPassword;
