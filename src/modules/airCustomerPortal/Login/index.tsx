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
} from './Login.Data';
import { AirCustomerPortalHeader } from '../AirCustomerPortalHeader';

import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const Login = () => {
  const method = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: loginDefaultValues,
  });
  const onSubmit = () => {
    enqueueSnackbar('Login Successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };
  const { handleSubmit } = method;

  return (
    <Grid container>
      <AirCustomerPortalHeader
        buttonText="Sign Up"
        link={AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_SIGN_UP}
      />
      <Grid item md={6}>
        <Grid p={7}>
          <Typography variant="h2">Welcome to Air Applecart</Typography>
          <Typography sx={{ py: 1 }} variant="h6" color="grey.900">
            Let’s Get Started!
          </Typography>
        </Grid>

        <Grid item md={7} xs={12} mx={{ md: 10, xs: 0 }}>
          <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
            {loginFormFields?.map((items) => {
              return (
                <Grid my={1} key={uuidv4()}>
                  <items.component {...items?.componentProps} size={'small'} />
                </Grid>
              );
            })}
            <LoadingButton
              sx={{ my: 2 }}
              variant="contained"
              fullWidth
              type="submit"
            >
              SignIn
            </LoadingButton>
          </FormProvider>
          <Link href={AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_FORGET}>
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
        pt={5}
        sx={{ display: { md: 'flex', xs: 'none' } }}
      >
        <Image src={LoginDashboardImage} alt="dashboard" />
      </Grid>
    </Grid>
  );
};
