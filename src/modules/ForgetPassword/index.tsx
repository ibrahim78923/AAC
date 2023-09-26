import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Grid, Button, Typography } from '@mui/material';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import InputField from '@/components/InputField';
import Dashboard from '@/assets/images/shared/login-dashboard.svg';
import { CompanyLogo } from '@/assets/images/shared/companylogo';

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

export default function ForgetPassword() {
  const [isEmailSuccess, setIsEmailSuccess] = useState<boolean>(false);
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setIsEmailSuccess(true);
  };

  return (
    <Box sx={{ background: 'white', height: '100vh' }}>
      <AuthHeader>
        <Box>
          <CompanyLogo />
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
            <Typography
              variant="h3"
              sx={{ color: '#1F2937', textAlign: 'center' }}
            >
              Forget Password{' '}
            </Typography>
            {!isEmailSuccess && (
              <Typography
                variant="h6"
                sx={{ color: '#9CA3AF', textAlign: 'center' }}
              >
                Let’s Get Start Enter the email associated with your account and
                we’ll send an email with instructions to reset your password!
              </Typography>
            )}

            <FormProvider>
              <form onSubmit={handleSubmit(onSubmit)} style={formStyling}>
                {isEmailSuccess ? (
                  <>
                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                      Email Sent
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: 'center', marginTop: '20px' }}
                    >
                      Password reset email has been sent to registered email.
                    </Typography>
                  </>
                ) : (
                  <>
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

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ marginY: '30px' }}
                    >
                      Continue
                    </Button>
                  </>
                )}
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
