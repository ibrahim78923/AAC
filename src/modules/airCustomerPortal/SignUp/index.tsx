import { Box, Grid, Typography } from '@mui/material';
import { CustomerPortalHeader } from '../CustomerPortalHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SignUpDefaultValues,
  SignUpFormFields,
  SignUpValidationSchema,
} from './SignUp.data';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { SignUpImage } from '@/assets/images';
import Image from 'next/image';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import router from 'next/router';

export const SignUp = () => {
  const method = useForm({
    resolver: yupResolver(SignUpValidationSchema),
    defaultValues: SignUpDefaultValues,
  });

  const onSubmit = () => {
    router.push(AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_CREATE_PASSWORD);
  };

  const { handleSubmit } = method;

  return (
    <Grid container>
      <CustomerPortalHeader
        buttonText={'Sign In'}
        onClick={() => {
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_LOGIN,
          });
        }}
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
            onSubmit={handleSubmit(onSubmit)}
          >
            {SignUpFormFields.map((item) => (
              <Grid key={item?.id} mt={1}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={item?.id} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
            <Box mt={2}>
              <LoadingButton variant="contained" fullWidth type="submit">
                Next
              </LoadingButton>
            </Box>
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
        <Image src={SignUpImage} alt={'dashboard'} />
      </Grid>
    </Grid>
  );
};
