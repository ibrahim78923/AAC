import { Grid, Typography } from '@mui/material';
import { LoginDashboardImage } from '@/assets/images';
import { yupResolver } from '@hookform/resolvers/yup';

import Image from 'next/image';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import {
  loginFormFields,
  loginDefaultValues,
  loginValidationSchema,
} from './Login.Data';
import { AirCustomerPortalHeader } from '../AirCustomerPortalHeader';

import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';

export const Login = () => {
  const logIn = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: loginDefaultValues,
  });
  const submitSignIn = () => {};

  const drawerSubmitHandler = () => {
    logIn?.handleSubmit(submitSignIn);
  };
  return (
    <Grid container>
      <AirCustomerPortalHeader />

      <Grid item md={6} pt={10}>
        <Grid item md={12}>
          <Typography variant="h2">Sign In to Air Applecart</Typography>
          <Typography sx={{ py: 1 }} variant="h6" color="grey.900">
            Let’s Get Started!
          </Typography>
        </Grid>

        <Grid item md={10} xs={12} m={{ md: 10, xs: 0 }}>
          <FormProvider
            methods={logIn}
            onSubmit={logIn?.handleSubmit(submitSignIn)}
          >
            {loginFormFields?.map((items) => {
              return (
                <Grid my={1} key={uuidv4()}>
                  <items.component {...items.componentProps} size={'small'} />
                </Grid>
              );
            })}
          </FormProvider>
          <LoadingButton
            sx={{ my: 2 }}
            variant="contained"
            fullWidth
            onClick={drawerSubmitHandler}
          >
            SignIn
          </LoadingButton>
          <Link href="/air-customer-portal/forget-password">
            <Typography
              fontWeight={600}
              color="primary"
              variant="body2"
              align="center"
            >
              Forgot Password
            </Typography>
          </Link>
        </Grid>
      </Grid>

      <Grid
        item
        md={6}
        container
        alignItems="center"
        sx={{ display: { md: 'flex', xs: 'none' } }}
      >
        <Image src={LoginDashboardImage} alt="dashboard" />
      </Grid>
    </Grid>
  );
};
