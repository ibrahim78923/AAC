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
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';

import { noOfEmployee } from './SignUp.data';

import {
  EyeIcon,
  EyeSlashIcon,
  CompanyLogoIcon,
  VerifiedIcon,
  ArrowBackIcon,
} from '@/assets/icons';

import { LoginDashboardImage } from '@/assets/images';

import { styles } from './SignUp.style';

import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';

const SignUp = () => {
  const {
    onSubmit,
    handleSubmit,
    methodsSignup,
    productData,
    isVerifiedSuccess,
    isLoading,
  } = useSignup();

  const products = productData?.data.map((product: any) => {
    return {
      value: product?._id,
      label: product?.name,
    };
  });

  const [isStepComplete, setIsStepComplete] = useState<boolean>(false);

  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles?.AuthHeader}>
        <Box>
          <CompanyLogoIcon />
        </Box>
        <Box>
          <Link href="/login" variant="contained">
            SignIn
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
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: theme?.palette?.grey[500_8] }}
                >
                  Welcome to Air Applecart
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <RHFTextField
                            name="firstName"
                            label="First Name"
                            placeholder="Enter First Name"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <RHFTextField
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RHFTextField
                            name="email"
                            label="Email Address"
                            placeholder="Enter Email"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RHFTextField
                            name="crn"
                            label="Organization Number"
                            placeholder="Enter Organization Number"
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="organizationName"
                            label="Organization Name"
                            placeholder="Enter Organization Name"
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFSelect
                            name="numberOfEmployees"
                            label="No of Employees"
                            size="small"
                          >
                            {noOfEmployee?.map((option: any) => (
                              <option key={uuidv4()} value={option?.value}>
                                {option?.label}
                              </option>
                            ))}
                          </RHFSelect>
                        </Grid>
                        <Grid item xs={12}>
                          <RHFSwitch
                            name="enableEmployeeVerification"
                            label="Verify your Employees through Identity Gram and Get 10% discount"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="phoneNumber"
                            label="Phone Number"
                            size="small"
                            placeholder="Enter Phone Number"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            sx={{ width: '100%' }}
                            onClick={() => setIsStepComplete(true)}
                          >
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <Box
                            onClick={() => setIsStepComplete(false)}
                            sx={{ cursor: 'pointer' }}
                          >
                            <ArrowBackIcon />
                          </Box>
                          <RHFMultiCheckbox
                            name="products"
                            GridView={6}
                            label="Select Product(s)"
                            options={products}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="DRN"
                            label=" Delegate Reference Number (DRN) if applied"
                            size="small"
                            placeholder="Enter DRN"
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
                                    onClick={handleClickShowPassword}
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
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            name="confirmPassword"
                            label="Confirm password"
                            placeholder="Enter Password"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
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
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <LoadingButton
                            variant="contained"
                            sx={{ width: '100%' }}
                            type="submit"
                            loading={isLoading}
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
              <Image src={LoginDashboardImage} alt="dashboard" />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SignUp;
