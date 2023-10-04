import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputField from '@/components/InputField';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './ForgetPassword.style';

const ForgetPassword = () => {
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
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles.AuthHeader}>
        <Box>
          <CompanyLogoIcon />
        </Box>
        <Box>
          <Link href="/login" variant="contained">
            Sign In
          </Link>
        </Box>
      </Box>
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
              sx={{ color: theme?.palette?.grey[500_8], textAlign: 'center' }}
            >
              Forget Password{' '}
            </Typography>
            {!isEmailSuccess && (
              <Typography
                variant="h6"
                sx={{
                  color: theme?.palette?.grey[500_12],
                  textAlign: 'center',
                }}
              >
                Let’s Get Start Enter the email associated with your account and
                we’ll send an email with instructions to reset your password!
              </Typography>
            )}

            <FormProvider>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={styles.formStyling}
              >
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
          style={styles.loginDashboard}
          sx={{
            '@media (max-width: 900px)': {
              display: 'none !important', // Hide the element when the screen width is less than 900px
            },
          }}
        >
          <Image src={LoginDashboardImage} alt="dashborad" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ForgetPassword;
