import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  resetPasswordDataArray,
  resetPasswordDefaultValues,
  resetPasswordValidationSchema,
} from './ResetPassword.data';
import resetPasswordSuccess from '@/assets/icons/shared/onSuccess.gif';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './ResetPassword.style';

const ResetPassword = () => {
  const [isMatchPassword, setIsMatchPassword] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();

  const resetPasswordForm = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const onSubmit = (data: any) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setIsMatchPassword(true);
    } else {
      setIsMatchPassword(false);
      setIsSuccess(true);

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  const { handleSubmit } = resetPasswordForm;

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
            {!isSuccess && (
              <Typography
                variant="h3"
                sx={{ textAlign: 'center', color: theme?.palette?.grey[500_8] }}
              >
                Reset Password
              </Typography>
            )}

            <Box style={styles.formStyling}>
              {isSuccess ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: '15px',
                      color: theme?.palette?.grey[500_8],
                    }}
                  >
                    Reset Password
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      src={resetPasswordSuccess}
                      alt="successIcon"
                      style={{ width: '170px', height: '170px' }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      marginTop: '15px',
                      color: theme?.palette?.grey[500_8],
                    }}
                  >
                    {' '}
                    Password reset email has been sent to registered email.{' '}
                  </Typography>
                </Box>
              ) : (
                <>
                  <FormProvider
                    methods={resetPasswordForm}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid container spacing={4}>
                      {resetPasswordDataArray?.map((item: any) => (
                        <Grid item xs={12} md={item?.md} key={uuidv4()}>
                          <item.component
                            {...item.componentProps}
                            size={'small'}
                          ></item.component>
                        </Grid>
                      ))}
                    </Grid>
                    {isMatchPassword && (
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        password not match
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ marginY: '30px', width: '100%' }}
                    >
                      Set Password
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
export default ResetPassword;
