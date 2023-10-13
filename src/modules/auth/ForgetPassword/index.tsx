import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Button, Typography, Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import {
  forgetPasswordDataArray,
  forgetPasswordDefaultValues,
  forgetPasswordValidationSchema,
} from './ForgetPassword.data';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './ForgetPassword.style';

const ForgetPassword = () => {
  const [isEmailSuccess, setIsEmailSuccess] = useState<boolean>(false);
  const theme = useTheme();

  const forgetPasswordForm = useForm({
    resolver: yupResolver(forgetPasswordValidationSchema),
    defaultValues: forgetPasswordDefaultValues,
  });

  const onSubmit = () => {
    setIsEmailSuccess(true);
  };

  const { handleSubmit } = forgetPasswordForm;

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
                  color: theme?.palette?.grey[900],
                  textAlign: 'center',
                }}
              >
                Let’s Get Start Enter the email associated with your account and
                we’ll send an email with instructions to reset your password!
              </Typography>
            )}

            <Box onSubmit={handleSubmit(onSubmit)} style={styles.formStyling}>
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
                  <FormProvider
                    methods={forgetPasswordForm}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid container spacing={4}>
                      {forgetPasswordDataArray?.map((item: any) => (
                        <Grid item xs={12} md={item?.md} key={uuidv4()}>
                          <item.component
                            {...item.componentProps}
                            size={'small'}
                          ></item.component>
                        </Grid>
                      ))}
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ marginY: '30px', width: '100%' }}
                    >
                      Continue
                    </Button>
                  </FormProvider>
                </>
              )}
            </Box>
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
