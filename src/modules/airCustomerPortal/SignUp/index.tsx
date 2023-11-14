import { Grid, Typography } from '@mui/material';
import React from 'react';
import { AirCustomerPortalHeader } from '../AirCustomerPortalHeader';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpDefaultValues, SignUpFormFields } from './SignUp.Data';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';
import { LoginDashboardImage } from '@/assets/images';
// import { Image } from '@mui/icons-material';
import Image from 'next/image';

export const SignUp = () => {
  const method = useForm({
    // resolver: yupResolver({}),
    defaultValues: SignUpDefaultValues,
  });
  const { handleSubmit } = method;
  const submitData = () => {
    // console.log(formData);
  };
  return (
    <Grid container>
      <AirCustomerPortalHeader
        buttonText={'Sign In'}
        link={'/air-customer-portal/log-in'}
      />

      <Grid item md={6}>
        <Grid p={7}>
          <Typography variant="h2">Welcome to Air Applecart</Typography>
          <Typography sx={{ py: 1 }} variant="h6" color="grey.900">
            Let’s Get Started!
          </Typography>
        </Grid>
        <Grid
          item
          md={8}
          mx={10}
          justifyContent={'center'}
          width={{ md: '50%' }}
        >
          <FormProvider
            size={'small'}
            methods={method}
            onSubmit={handleSubmit(submitData)}
          >
            {SignUpFormFields.map((item) => (
              <Grid key={uuidv4()} mt={1}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
            <LoadingButton
              variant="contained"
              fullWidth
              // onClick={SubmitHandler}
            >
              Continue
            </LoadingButton>
          </FormProvider>
        </Grid>
      </Grid>
      <Grid item md={6} p={10}>
        <Image src={LoginDashboardImage} alt={'dasboard'} />
      </Grid>
    </Grid>
  );
};
