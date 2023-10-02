import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Grid, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputField from '@/components/InputField';

const EditProfile = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  const onSubmit = () => {};

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: theme?.palette?.grey[500_8], marginBottom: '20px' }}
      >
        Work Information
      </Typography>

      <FormProvider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                First Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{
                  required: 'required field',
                }}
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="firstName"
                    placeholder="Enter First Name"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="text"
                    hasError={!!errors?.firstName}
                  />
                )}
              />

              {errors?.firstName && (
                <Typography
                  variant="body1"
                  sx={{ color: theme?.palette?.error?.main }}
                >
                  {' '}
                  {errors?.firstName?.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Middle Name{' '}
              </Typography>
              <Controller
                name="middleName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="middleName"
                    placeholder="Enter Middle Name"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="text"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Last Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{
                  required: 'required field',
                }}
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="lastName"
                    placeholder="Enter Last Name"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="text"
                    hasError={!!errors?.lastName}
                  />
                )}
              />

              {errors?.lastName && (
                <Typography
                  variant="body1"
                  sx={{ color: theme?.palette?.error?.main }}
                >
                  {' '}
                  {errors?.lastName?.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6} lg={6}></Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Work Phone Number{' '}
              </Typography>
              <Controller
                name="WorkPhoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="WorkPhoneNumber"
                    placeholder="Enter Middle Name"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="number"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Mobile Number{' '}
              </Typography>
              <Controller
                name="MobileNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="MobileNumber"
                    placeholder="Enter Middle Name"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="number"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Company Name{' '}
              </Typography>
              <Controller
                name="CompanyName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="CompanyName"
                    placeholder="Enter Company Name"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="number"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Job Title{' '}
              </Typography>
              <Controller
                name="Job Title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="Job Title"
                    placeholder="Enter Job Title"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="text"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ marginY: '30px' }}>
            Save
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default EditProfile;
