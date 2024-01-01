import { Grid, Typography } from '@mui/material';
import { LoginDashboardImage } from '@/assets/images';
import { yupResolver } from '@hookform/resolvers/yup';

import Image from 'next/image';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  loginFormFields,
  loginDefaultValues,
  loginValidationSchema,
} from './Login.data';
import { CustomerPortalHeader } from '../CustomerPortalHeader';

import { LoadingButton } from '@mui/lab';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import router from 'next/router';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const method = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: loginDefaultValues,
  });
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const onSubmit = () => {
    enqueueSnackbar('Logged in Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const { handleSubmit } = method;

  return (
    <Grid container>
      <CustomerPortalHeader
        buttonText="Sign Up"
        onClick={() =>
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_SIGN_UP,
          })
        }
      />
      <Grid item md={6} xs={12}>
        <Grid p={7}>
          <Typography variant="h2">Sign In to Air Applecart</Typography>
          <Typography sx={{ py: 1 }} variant="h6" color="grey.900">
            Let’s Get Started!
          </Typography>
        </Grid>

        <Grid item md={7} xs={12} mx={{ md: 10, xs: 0 }}>
          <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
            {loginFormFields(showPassword, handleClickShowPassword)?.map(
              (item) => {
                return (
                  <Grid my={1} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                );
              },
            )}
            <LoadingButton
              sx={{ my: 2 }}
              variant="contained"
              fullWidth
              type="submit"
            >
              Sign In
            </LoadingButton>
          </FormProvider>

          <Typography
            fontWeight={600}
            color="primary"
            variant="body2"
            align="center"
            onClick={() =>
              router?.push({
                pathname: AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_FORGET,
              })
            }
          >
            Forgot Password
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        md={6}
        container
        alignItems="center"
        pt={5}
        sx={{ display: { md: 'flex', xs: 'none' } }}
      >
        <Image src={LoginDashboardImage} alt="dashboard" />
      </Grid>
    </Grid>
  );
};
