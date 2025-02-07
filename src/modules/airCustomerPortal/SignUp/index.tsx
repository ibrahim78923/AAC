import { Box, Button, Typography } from '@mui/material';
import { CustomerPortalHeader } from '../CustomerPortalHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { SignUpImage } from '@/assets/images';
import Image from 'next/image';
import { AUTH } from '@/constants';
import useSignUp from './useSignUp';
import { signUpFormFields } from './SignUp.data';
import NoData from '@/components/NoData';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { PROJECT_NAME } from '@/config';

export const SignUp = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    stepState,
    onNext,
    createPasswordDataArray,
    setStepState,
    postSignUpStatus,
    companyId,
    igVerificationStatus,
  } = useSignUp();

  if (!!!companyId)
    return <NoData message={'No valid companyId found'} height={'100%'} />;

  return (
    <>
      <CustomerPortalHeader buttonText={'Sign In'} pathname={AUTH?.LOGIN} />
      <ContainerGrid
        customStyles={{
          height: '90vh',
          alignItems: 'center',
          px: { xs: 2, md: 0 },
        }}
      >
        <CustomGrid md={6}>
          <Box maxWidth={{ xs: '100%', md: '70%' }} margin="auto">
            <Typography variant="h2">Welcome to {PROJECT_NAME}</Typography>
            <Typography sx={{ py: 1 }} variant="h6" color="grey.900" mb={4}>
              Let&rsquo;s Get Started!
            </Typography>

            <Box maxWidth={{ xs: '100%', md: '80%' }} margin={'auto'}>
              <FormProvider
                size={'small'}
                methods={methods}
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
                      disabled={
                        postSignUpStatus?.isLoading ||
                        igVerificationStatus?.isLoading
                      }
                    >
                      Back
                    </Button>
                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      loading={
                        postSignUpStatus?.isLoading ||
                        igVerificationStatus?.isLoading
                      }
                    >
                      Sign Up
                    </LoadingButton>
                  </>
                )}
              </FormProvider>
            </Box>
          </Box>
        </CustomGrid>
        <CustomGrid md={6}>
          <Image
            src={SignUpImage}
            alt={'dashboard'}
            width={668}
            height={513}
            style={{ width: '100%', height: 'auto' }}
          />
        </CustomGrid>
      </ContainerGrid>
    </>
  );
};
