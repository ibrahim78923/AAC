import { Box, Typography } from '@mui/material';
import { CustomerPortalHeader } from '../CustomerPortalHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { SignUpImage } from '@/assets/images';
import { AUTH } from '@/constants';
import useSignUp from './useSignUp';
import { signUpFormFields } from './SignUp.data';
import NoData from '@/components/NoData';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { PROJECT_NAME } from '@/config';
import { StaticAvatar } from '@/components/Avatars/StaticAvatar';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

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
            <Typography variant="h2" color="slateBlue.main">
              Welcome to {PROJECT_NAME}
            </Typography>
            <Typography
              color="grey.800"
              sx={{ py: 1, mb: 4, fontWight: 'fontWeightSmall' }}
            >
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
                    <CustomLoadingButton
                      fullWidth
                      customStyles={{ my: 2 }}
                      onClick={onNext}
                    >
                      Next
                    </CustomLoadingButton>
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
                    <CustomLoadingButton
                      primary={false}
                      fullWidth
                      customStyles={{ my: 2 }}
                      onClick={() => {
                        setStepState(false);
                      }}
                      disabled={
                        postSignUpStatus?.isLoading ||
                        igVerificationStatus?.isLoading
                      }
                    >
                      Back
                    </CustomLoadingButton>
                    <CustomLoadingButton
                      fullWidth
                      type="submit"
                      loading={
                        postSignUpStatus?.isLoading ||
                        igVerificationStatus?.isLoading
                      }
                    >
                      Sign Up
                    </CustomLoadingButton>
                  </>
                )}
              </FormProvider>
            </Box>
          </Box>
        </CustomGrid>
        <CustomGrid md={6}>
          <StaticAvatar
            avatarSrc={SignUpImage}
            padding={1}
            width="80%"
            height={'auto'}
            variant={AVATAR_VARIANTS?.SQUARE}
            aspectRatio="1.41"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </CustomGrid>
      </ContainerGrid>
    </>
  );
};
