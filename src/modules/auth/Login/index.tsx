import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Grid, Typography, Box, useTheme } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import useAuth from '@/hooks/useAuth';

import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';

import { styles } from './Login.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAuthLoginMutation } from '@/services/auth';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';
import {
  loginDataArray,
  loginDefaultValues,
  loginValidationSchema,
} from './Login.data';
import { useRouter } from 'next/router';
import { AUTH } from '@/constants';
import { errorSnackbar } from '@/lib/snackbar';

const Login = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const loginForm = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: loginDefaultValues,
  });

  const { login } = useAuth();
  const [authLogin, { isLoading }] = useAuthLoginMutation();
  let res: any;
  const onSubmit = async (credentials: any) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const credentialsWithTimeZone = {
      ...credentials,
      timezone,
    };
    try {
      res = await authLogin(credentialsWithTimeZone)?.unwrap();
      login(res);
    } catch (error: any) {
      const errMsg = res?.message;
      errorSnackbar(errMsg ?? error?.data?.message ?? 'Error occured');
    }
  };

  const { handleSubmit } = loginForm;

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles?.AuthHeader}>
        <Box
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => push(AUTH?.SALE_SITE)}
        >
          <CompanyLogoIcon />
        </Box>
        <Box>
          <Link href="/sign-up">Sign Up</Link>
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
            sx={{
              width: { md: '60%', sm: '70%', xs: '90%' },
              margin: 'auto',

              '@media (max-height: 617px)': {
                // Adjust styles for screens with height less than 617px

                zIndex: -100,
                height: '80vh',
                overflowX: 'scroll',
                typography: {
                  h3: {
                    // padding: '1rem',
                    fontSize: '1.5rem',
                    marginTop: '1rem',
                  },
                  h6: {
                    fontSize: '1rem',
                  },
                },
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: theme?.palette?.grey[500_8], marginBottom: '10px' }}
            >
              Sign In to Air Applecart
            </Typography>
            <Typography variant="h6" sx={{ color: theme?.palette?.grey[900] }}>
              Let’s Get Started
            </Typography>

            <Box sx={styles?.formStyling}>
              <FormProvider
                methods={loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={4}>
                  {loginDataArray(
                    handleClickShowPassword,
                    handleMouseDownPassword,
                    showPassword,
                  )?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={uuidv4()}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                      ></item.component>
                    </Grid>
                  ))}
                </Grid>

                <LoadingButton
                  variant="contained"
                  sx={{ marginY: '30px', width: '100%' }}
                  type="submit"
                  loading={isLoading}
                >
                  Sign In
                </LoadingButton>
              </FormProvider>
              <Link href="/forget-password" style={styles?.aTag}>
                Forgot password?
              </Link>
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
            width: 'auto',
            height: 'auto',
            '@media (max-height: 617px)': {
              // Adjust styles for screens with height less than 617px

              height: '80vh',
              mt: '1rem',
              overflowX: 'scroll',
            },
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

export default Login;
