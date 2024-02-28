import { Box, Grid, Typography } from '@mui/material';
import { SignUpImage } from '@/assets/images';
import Image from 'next/image';
import { FormProvider } from '@/components/ReactHookForm';
import { CustomerPortalHeader } from '../CustomerPortalHeader';
import { LoadingButton } from '@mui/lab';
import { AIR_CUSTOMER_PORTAL, AUTH } from '@/constants';
import Link from 'next/link';
import useLogin from './useLogin';

export const Login = () => {
  const { method, handleSubmit, onSubmit, dataArray, postSignInStatus } =
    useLogin();

  return (
    <>
      <CustomerPortalHeader
        buttonText={'Sign Up'}
        pathname={AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_SIGN_UP}
      />

      <Grid
        container
        spacing={2}
        height={'90vh'}
        alignItems={'center'}
        px={{ xs: 2, md: 0 }}
      >
        <Grid
          item
          xs={12}
          md={6}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box width={{ xs: '100%', md: '70%' }}>
            <Typography variant="h2">Sign In to Air Applecart</Typography>
            <Typography sx={{ py: 1 }} variant="h6" color="grey.900" mb={4}>
              Let&rsquo;s Get Started!
            </Typography>

            <Box width={{ xs: '100%', md: '80%' }} margin={'auto'}>
              <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
                {dataArray?.map((item: any) => (
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    key={item?.id}
                  />
                ))}

                <LoadingButton
                  sx={{ my: 2 }}
                  variant="contained"
                  fullWidth
                  type="submit"
                  loading={postSignInStatus?.isLoading}
                >
                  Sign In
                </LoadingButton>
              </FormProvider>

              <Link href={AUTH?.FORGOT_PASSWORD}>
                <Typography
                  fontWeight={600}
                  color="primary"
                  variant="body2"
                  align="center"
                >
                  Forgot Password
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} display={'flex'} justifyContent={'flex-end'}>
          <Image
            src={SignUpImage}
            alt="dashboard"
            width={668}
            height={513}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </>
  );
};
