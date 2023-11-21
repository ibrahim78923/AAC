import { Grid, Typography } from '@mui/material';
import { AirCustomerPortalHeader } from '../AirCustomerPortalHeader';
import {
  createPasswordValidationSchema,
  createPasswordFields,
  createPasswordFormDefaultValues,
} from './CreatePassword.data';

import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';
import { SignUpImage } from '@/assets/images';
import Image from 'next/image';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
export const CreatePassword = () => {
  const method = useForm({
    resolver: yupResolver(createPasswordValidationSchema),
    defaultValues: createPasswordFormDefaultValues,
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
        buttonText={'Sign In'}
        link={AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_LOGIN}
      />

      <Grid item md={6}>
        <Grid p={7}>
          <Typography variant="h2">Welcome to Air Applecart</Typography>
          <Typography sx={{ py: 1 }} variant="h6" color="grey.900">
            Let’s Get Started!
          </Typography>
        </Grid>

        <Grid item md={6} xs={12} mx={{ md: 10, xs: 0 }}>
          <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
            {createPasswordFields?.map((item) => {
              return (
                <Grid my={1} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              );
            })}
            <LoadingButton
              sx={{ my: 2 }}
              variant="contained"
              fullWidth
              type="submit"
            >
              Sign Up
            </LoadingButton>
          </FormProvider>
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
        <Image src={SignUpImage} alt="dashboard" />
      </Grid>
    </Grid>
  );
};
