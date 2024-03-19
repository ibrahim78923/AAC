import { Box, Button, Grid, Typography } from '@mui/material';
import { CustomerPortalHeader } from '../CustomerPortalHeader';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { SignUpImage } from '@/assets/images';
import Image from 'next/image';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import useSignUp from './useSignUp';
import { signUpFormFields } from './SignUp.data';

export const SignUp = () => {
  const {
    method,
    handleSubmit,
    onSubmit,
    stepState,
    onNext,
    createPasswordDataArray,
    setStepState,
    postSignUpStatus,
    apiQueryCompany,
    companyId,
  } = useSignUp();

  return (
    <>
      <CustomerPortalHeader
        buttonText={'Sign In'}
        pathname={AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_LOGIN}
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
            <Typography variant="h2">Welcome to Air Applecart</Typography>
            <Typography sx={{ py: 1 }} variant="h6" color="grey.900" mb={4}>
              Let&rsquo;s Get Started!
            </Typography>

            <Box width={{ xs: '100%', md: '80%' }} margin={'auto'}>
              <FormProvider
                size={'small'}
                methods={method}
                onSubmit={handleSubmit(onSubmit)}
              >
                {!stepState ? (
                  <>
                    {signUpFormFields.map((item: any) => (
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                        key={item?.id}
                      />
                    ))}
                    {!!!companyId && (
                      <RHFAutocompleteAsync
                        name={'companyName'}
                        label={'Company Name'}
                        placeholder={'Enter Company Name'}
                        apiQuery={apiQueryCompany}
                        queryKey={'product'}
                      />
                    )}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ my: 2 }}
                      onClick={onNext}
                    >
                      Next
                    </Button>
                  </>
                ) : (
                  <>
                    {createPasswordDataArray.map((item: any) => (
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                        key={item?.id}
                      />
                    ))}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ my: 2 }}
                      onClick={() => {
                        setStepState(false);
                      }}
                    >
                      Back
                    </Button>
                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      loading={postSignUpStatus?.isLoading}
                    >
                      Sign Up
                    </LoadingButton>
                  </>
                )}
              </FormProvider>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'flex-end'}>
          <Image
            src={SignUpImage}
            alt={'dashboard'}
            width={668}
            height={513}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </>
  );
};
