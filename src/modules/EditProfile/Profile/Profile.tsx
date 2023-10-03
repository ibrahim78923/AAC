import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Grid, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputField from '@/components/InputField';

const Profile = () => {
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
        sx={{ color: theme?.palette?.grey[500], marginBottom: '20px' }}
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
                    error={errors?.firstName?.message}
                  />
                )}
              />
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
                    error={errors?.lastName?.message}
                  />
                )}
              />
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
                name="JobTitle"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="JobTitle"
                    placeholder="Enter Job Title"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="text"
                  />
                )}
              />
            </Grid>

            <Grid item lg={12}>
              <Typography
                variant="h4"
                sx={{
                  color: theme?.palette?.grey[500_8],
                  marginBottom: '20px',
                }}
              >
                Other Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Language{' '}
              </Typography>
              <Controller
                name="Language"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="Language"
                    placeholder="Enter Language"
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
                Twitter URL{' '}
              </Typography>
              <Controller
                name="TwitterURL"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="TwitterURL"
                    placeholder="Enter URL"
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
                Facebook URL{' '}
              </Typography>
              <Controller
                name="FacebookURL"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="FacebookURL"
                    placeholder="Enter URL"
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
                LinedIn URL{' '}
              </Typography>
              <Controller
                name="LinedInURL"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    field={{ ...field }}
                    name="LinedInURL"
                    placeholder="Enter URL"
                    width="100%"
                    height="23px"
                    autoComplete="off"
                    type="text"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box
            sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}
          >
            <Button
              sx={{
                marginRight: '15px',
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                borderRadius: '4px',
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Profile;
