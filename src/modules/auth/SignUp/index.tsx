import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Grid,
  Button,
  Typography,
  useTheme,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';

import useSignup from './useSignup';

import {
  FormProvider,
  RHFMultiCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';

import { EyeIcon, EyeSlashIcon, VerifiedIcon } from '@/assets/icons';

import { LoginDashboardImage2 } from '@/assets/images';

import { styles } from './SignUp.style';

import { LoadingButton } from '@mui/lab';
import StepOne from './StepOne';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';
import { PROJECT_NAME } from '@/config';
import { AUTH } from '@/constants';
import { useRouter } from 'next/router';

const SignUp = () => {
  const {
    onSubmit,
    handleSubmit,
    methodsSignup,
    productData,
    isVerifiedSuccess,
    isLoading,
    allValuesNotEmpty,
    isStepComplete,
    setIsStepComplete,
    isError,
    isEmailError,
    drnIsError,
  } = useSignup();

  const products = productData?.data.map((product: any) => {
    return {
      value: product?._id,
      label: product?.name,
    };
  });

  const theme = useTheme();
  const { push } = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [ConfirmShowPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (field: any) => {
    if (field === 'Password') {
      setShowPassword((show) => !show);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((show) => !show);
    }
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles?.AuthHeader}>
        <Box
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => push(AUTH?.SALE_SITE)}
        >
          <LogoAvatar />
        </Box>
        <Box>
          <Link href="/login" variant="contained">
            Sign In
          </Link>
        </Box>
      </Box>
      <Grid
        container
        sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}
      >
        {isVerifiedSuccess ? (
          <Box sx={{ textAlign: 'center', width: { md: '40%', xs: '85%' } }}>
            <VerifiedIcon />
            <Typography variant="h3" sx={{ marginTop: '10px' }}>
              Let’s get You Verified
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme?.palette?.grey[900], marginBottom: '20px' }}
            >
              A verification Link has been sent to your email account. Please
              click on that link for further verification to proceed.
            </Typography>
            <Typography variant="h6" sx={{ color: theme?.palette?.grey[900] }}>
              If you didn’t get the verification email click on
              <Link
                href="/sign-up"
                style={{
                  color: theme?.palette?.primary?.main,
                  fontWeight: '600',
                }}
              >
                Resend link
              </Link>
            </Typography>
          </Box>
        ) : (
          <>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                className="form-styled"
                sx={{
                  width: { md: '60%', sm: '70%', xs: '90%' },
                  margin: 'auto',
                  height: { md: '90vh', xs: '85vh' },
                  overflowX: 'scroll',
                }}
              >
                <Typography
                  variant="h3"
                  mt={2}
                  sx={{ color: theme?.palette?.grey[500_8] }}
                >
                  Welcome to {PROJECT_NAME}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.grey[500_12] }}
                >
                  Let’s Get Started!
                </Typography>
                <Box style={styles?.formStyling}>
                  <FormProvider
                    methods={methodsSignup}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {!isStepComplete ? (
                      <>
                        <StepOne />
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            sx={{ width: '100%', marginTop: '15px' }}
                            onClick={() =>
                              allValuesNotEmpty()
                                ? setIsStepComplete(true)
                                : setIsStepComplete(false)
                            }
                            disabled={isError || isEmailError}
                          >
                            Next
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <RHFMultiCheckbox
                            name="products"
                            GridView={6}
                            label="Select Product(s)"
                            options={products}
                            required={true}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="DRN"
                            label=" Delegate Reference Number (DRN) if applied"
                            size="small"
                            placeholder="Enter DRN"
                            // autoComplete="off"
                            autoComplete="new-password"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="password"
                            label="Password"
                            size="small"
                            placeholder="Enter Password"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                      handleClickShowPassword('Password')
                                    }
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {!showPassword ? (
                                      <EyeSlashIcon />
                                    ) : (
                                      <EyeIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            required={true}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="confirmPassword"
                            label="Confirm password"
                            placeholder="Enter Password"
                            size="small"
                            type={ConfirmShowPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                      handleClickShowPassword('confirmPassword')
                                    }
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {!ConfirmShowPassword ? (
                                      <EyeSlashIcon />
                                    ) : (
                                      <EyeIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            required={true}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            sx={{ width: '100%' }}
                            onClick={() => setIsStepComplete(false)}
                          >
                            Back
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <LoadingButton
                            variant="contained"
                            sx={{ width: '100%' }}
                            type="submit"
                            loading={isLoading}
                            disabled={drnIsError}
                          >
                            Submit
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    )}
                  </FormProvider>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={0}
              md={6}
              lg={6}
              style={styles?.loginDashboard}
              sx={{
                '@media (max-width: 900px)': {
                  display: 'none !important',
                },
              }}
            >
              <Image
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  boxShadow: '#00000030 0px 0px 20px 1px',
                }}
                src={LoginDashboardImage2}
                alt="dashborad"
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SignUp;
