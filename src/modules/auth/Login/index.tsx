import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { CompanyLogoIcon } from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './Login.style';
import {
  loginDataArray,
  loginDefaultValues,
  loginValidationSchema,
} from './Login.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
  const theme = useTheme();
  const loginForm = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = () => {};

  const { handleSubmit } = loginForm;
  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles.AuthHeader}>
        <Box>
          <CompanyLogoIcon />
        </Box>
        <Box>
          <Link href="/sign-up" variant="contained">
            SignUp
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
              sx={{ color: theme?.palette?.grey[500_8], marginBottom: '10px' }}
            >
              Sign In to Air Applecart
            </Typography>
            <Typography variant="h6" sx={{ color: theme?.palette?.grey[900] }}>
              Let’s Get Started
            </Typography>

            <Box sx={styles.formStyling}>
              <FormProvider
                methods={loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={4}>
                  {loginDataArray?.map((item: any) => (
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
                  Sign In
                </Button>
              </FormProvider>
              <Link href="/forget-password" style={styles.aTag}>
                Forgot password?
              </Link>
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

export default Login;
