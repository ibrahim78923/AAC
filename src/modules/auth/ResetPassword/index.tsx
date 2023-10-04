import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputField from '@/components/InputField';
import resetPasswordSuccess from '@/assets/icons/shared/onSuccess.gif';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './ResetPassword.style';

const ResetPassword = () => {
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isMatchPassword, setIsMatchPassword] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const onSubmit = (data: any) => {
    const { newPassword, confirmPassword } = data;

    if (isPasswordValid(newPassword)) {
      if (newPassword !== confirmPassword) {
        setIsMatchPassword(true);
      } else {
        setIsMatchPassword(false);
        setIsSuccess(true);

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    }
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
            {!isSuccess && (
              <Typography
                variant="h3"
                sx={{ textAlign: 'center', color: theme?.palette?.grey[500_8] }}
              >
                Reset Password
              </Typography>
            )}

            <FormProvider>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={styles.formStyling}
              >
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

                    <Image
                      src={resetPasswordSuccess}
                      alt="successIcon"
                      style={{ width: '170px', height: '170px' }}
                    />

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
                    <label style={{ marginBottom: '8px', marginTop: '10px' }}>
                      New password <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Controller
                      name="newPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'required field',
                        validate: (value) =>
                          isPasswordValid(value)
                            ? setIsShowError(false)
                            : setIsShowError(true),
                      }}
                      render={({ field }) => (
                        <InputField
                          field={{ ...field }}
                          name="newPassword"
                          placeholder="Enter password"
                          width="100%"
                          height="23px"
                          autoComplete="off"
                          hasError={!!errors?.newPassword}
                          type="text"
                        />
                      )}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: '7px',
                        color: isShowError && theme?.palette?.error?.main,
                      }}
                    >
                      The Password must be at least 8 characters long having 1
                      capital letter,1 small letter and 1 numeric digit
                    </Typography>

                    {errors?.newPassword && (
                      <Typography
                        variant="body1"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        {' '}
                        {errors?.newPassword?.message}
                      </Typography>
                    )}

                    <label style={{ marginBottom: '8px', marginTop: '10px' }}>
                      Confirm Password <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Required field',
                      }}
                      render={({ field }) => (
                        <InputField
                          field={{ ...field }}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          width="100%"
                          height="23px"
                          autoComplete="off"
                          hasError={!!errors?.confirmPassword}
                          type="text"
                        />
                      )}
                    />

                    {isMatchPassword && (
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        password not match
                      </Typography>
                    )}

                    {errors?.confirmPassword && (
                      <Typography
                        variant="body1"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        {' '}
                        {errors?.confirmPassword?.message}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ marginY: '30px' }}
                    >
                      Set Password
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
export default ResetPassword;
