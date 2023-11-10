import { Button, Grid, Typography } from '@mui/material';
import { LoginDashboardImage } from '@/assets/images';
import { yupResolver } from '@hookform/resolvers/yup';

import Image from 'next/image';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import {
  signUpData,
  signUpDefaultValues,
  signUpValidationSchema,
} from './LoginData';
import { AirCustomerPortalHeader } from '../AirCustomerportalHeader';

import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function Login() {
  const signInForm = useForm({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: signUpDefaultValues,
  });
  const submiteSignIn = () => {};
  const drawerSubmitHandler = () => {
    signInForm?.handleSubmit(submiteSignIn)();
  };
  return (
    <Grid container>
      <AirCustomerPortalHeader />

      <Grid item md={6} pt={10}>
        <Grid item md={12}>
          <Typography variant="h2">Sign In to Air Applecart</Typography>
          <Typography sx={{ py: 1 }} variant="h6" color="#9CA3AF">
            Let’s Get Started!
          </Typography>
        </Grid>

        <Grid item md={10} xs={12} m={{ md: 10, xs: 0 }}>
          <FormProvider
            methods={signInForm}
            onSubmit={signInForm?.handleSubmit(submiteSignIn)}
          >
            {signUpData.map((items) => {
              return (
                <Grid my={1} key={uuidv4()}>
                  <items.component
                    {...items.componentProps}
                    size={'small'}
                  ></items.component>
                </Grid>
              );
            })}
          </FormProvider>
          <Button
            sx={{ my: 2 }}
            variant="contained"
            fullWidth
            onClick={drawerSubmitHandler}
          >
            SignIn
          </Button>
          <Link href="/air-customer-portal/forget-password">
            <Typography
              fontWeight={600}
              color="primary"
              variant="body2"
              align="center"
            >
              Forget Password
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
}
