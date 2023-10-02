import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Button, InputAdornment, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InputField from '@/components/InputField';
import { AuthHeader, aTag, formStyling, loginDashboard } from './Login.style';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <Box sx={{ background: 'white', height: '100vh' }}>
      <AuthHeader>
        <Box>
          <CompanyLogoIcon />
        </Box>
        <Box>
          <Link href="/sign-up" variant="contained">
            SignUp
          </Link>
        </Box>
      </AuthHeader>
      <Grid
        container
        spacing={2}
        sx={{ height: '100vh', alignItems: 'center' }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Box
            className="form-styled"
            sx={{ width: { md: '60%', sm: '70%', xs: '90%' }, margin: 'auto' }}
          >
            <Typography
              variant="h3"
              sx={{ color: theme?.palette?.grey[500_8] }}
            >
              Sign In to Air Applecart
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme?.palette?.grey[500_12] }}
            >
              Let’s Get Started
            </Typography>
            <FormProvider>
              <form onSubmit={handleSubmit(onSubmit)} style={formStyling}>
                <label style={{ marginBottom: '8px', marginTop: '5px' }}>
                  Email <span style={{ color: 'red' }}>*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'required field',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      field={{ ...field }}
                      name="email"
                      placeholder="Enter email"
                      width="100%"
                      height="23px"
                      autoComplete="off"
                      type="text"
                      hasError={!!errors?.email}
                    />
                  )}
                />

                {errors?.email && (
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.error?.main }}
                  >
                    {' '}
                    {errors?.email?.message}
                  </Typography>
                )}

                <label style={{ marginBottom: '8px', marginTop: '10px' }}>
                  password <span style={{ color: 'red' }}>*</span>
                </label>
                <Controller
                  name="passwords"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'required field' }}
                  render={({ field }) => (
                    <InputField
                      field={{ ...field }}
                      name="passwords"
                      placeholder="Enter password"
                      width="100%"
                      height="23px"
                      autoComplete="off"
                      hasError={!!errors?.passwords}
                      type={isShowPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ width: '30px', cursor: 'pointer' }}
                          >
                            {isShowPassword ? (
                              <RemoveRedEyeIcon
                                onClick={() =>
                                  setIsShowPassword(!isShowPassword)
                                }
                              />
                            ) : (
                              <VisibilityOffIcon
                                onClick={() =>
                                  setIsShowPassword(!isShowPassword)
                                }
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors?.passwords && (
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.error?.main }}
                  >
                    {' '}
                    {errors?.passwords?.message}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginY: '30px' }}
                >
                  Sign In
                </Button>
                <Link href="/forget-password" style={aTag}>
                  Forgot password?
                </Link>
              </form>
            </FormProvider>
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          lg={6}
          style={loginDashboard}
          sx={{
            '@media (max-width: 900px)': {
              display: 'none !important', // Hide the element when the screen width is less than 900px
            },
          }}
        >
          <Image
            src={LoginDashboardImage}
            alt="dashborad"
            style={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
