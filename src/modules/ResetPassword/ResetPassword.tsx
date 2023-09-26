import React from 'react';
import { useTheme } from '@emotion/react';
import { Grid, Button, Typography } from '@mui/material';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import InputField from '@/components/InputField';
import Dashboard from '../../assets/images/shared/login-dashboard.svg';
import Logo from '../../assets/images/shared/company-logo.svg';

export default function ResetPassword() {
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

  const loginDashboard = {
    backgroundColor: 'rgb(245, 245, 245)',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
          <Link href="/login" variant="contained">
            Sign In
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
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Reset Password
            </Typography>
            <FormProvider>
              <form onSubmit={handleSubmit(onSubmit)} style={formStyling}>
                <label style={{ marginBottom: '8px', marginTop: '10px' }}>
                  New password <span style={{ color: 'red' }}>*</span>
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
                      hasError={!!errors.passwords}
                      type="text"
                    />
                  )}
                />
                {errors.passwords && (
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.error?.main }}
                  >
                    {' '}
                    {errors.passwords.message}
                  </Typography>
                )}

                <label style={{ marginBottom: '8px', marginTop: '10px' }}>
                  Confirm Password <span style={{ color: 'red' }}>*</span>
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
                      placeholder="Confirm Password"
                      width="100%"
                      height="23px"
                      autoComplete="off"
                      hasError={!!errors.passwords}
                      type="text"
                    />
                  )}
                />
                {errors.passwords && (
                  <Typography
                    variant="body1"
                    sx={{ color: theme?.palette?.error?.main }}
                  >
                    {' '}
                    {errors.passwords.message}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginY: '30px' }}
                >
                  Set Password
                </Button>
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
          <Image src={Dashboard} alt="dashborad" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
}
