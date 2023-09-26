import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Grid, Button, InputAdornment, Typography } from '@mui/material';
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Image from 'next/image';
import Link from 'next/link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Dashboard from '../../assets/images/shared/login-dashboard.svg';
import Logo from '../../assets/images/shared/company-logo.svg';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import InputField from '@/components/InputField';

export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const AuthHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 20,
    width: '100%',
    zIndex: 1,
    padding: '0 7%',
    '& a': {
      backgroundColor: '#41CCB8',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '85px',
      height: '44px',
    },
  });

  const aTag = {
    textAlign: 'center',
    color: '#38CAB5',
    fontWeight: '600',
  };
  const loginDashboard = {
    backgroundColor: 'rgb(245, 245, 245)',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // '@media (max-width: 900px)': {
    //   display: "none",
    // }
  };

  const formStyling = {
    display: 'grid',
    border: '1.5px solid #E5E7EB',
    borderRadius: '8px',
    padding: '30px',
    marginTop: '30px',
  };
  const onSubmit = () => {};

  return (
    <Box sx={{ background: 'white', height: '100vh' }}>
      <AuthHeader>
        <Box>
          <Image src={Logo} alt="Logo" style={{ width: '100%' }} />
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
            sx={{ width: { md: '60%', xs: '90%' }, margin: 'auto' }}
          >
            <Typography variant="h2">Sign In to Air Applecart</Typography>
            <Typography variant="h6" sx={{ color: '#9CA3AF' }}>
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
                  rules={{ required: 'email is required' }}
                  render={({ field }) => (
                    <InputField
                      field={{ ...field }}
                      name="email"
                      placeholder="Enter email"
                      width="100%"
                      height="23px"
                      autoComplete="off"
                      type="text"
                      hasError={!!errors.email}
                    />
                  )}
                />

                {errors.email && (
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.error?.main }}
                  >
                    {' '}
                    required field
                  </Typography>
                )}

                <label style={{ marginBottom: '8px', marginTop: '10px' }}>
                  password <span style={{ color: 'red' }}>*</span>
                </label>
                <Controller
                  name="passwords"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'passwords is required' }}
                  render={({ field }) => (
                    <InputField
                      field={{ ...field }}
                      name="passwords"
                      placeholder="Enter password"
                      width="100%"
                      height="23px"
                      autoComplete="off"
                      hasError={!!errors.passwords}
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
                {errors.passwords && (
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.error?.main }}
                  >
                    {' '}
                    required field
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
        <Grid item xs={0} md={6} lg={6} style={loginDashboard}>
          <Image src={Dashboard} alt="dashborad" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
}
