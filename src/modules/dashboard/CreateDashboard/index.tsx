import { ExampleDashboard } from '@/assets/images';
// import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export const CreateDashboard = () => {
  const theme = useTheme();
  //   const methodsCreateDashboardFilterForm = useForm({
  //     defaultValues: {
  //       dashboardName: '',
  //     },
  //   });
  //   const submitCreateDashboardFilterForm = async () => {};
  //   const resetCreateDashboardFilterForm = async () => {
  //     methodsCreateDashboardFilterForm?.reset();
  //   };
  return (
    <>
      {/* <FormProvider methods={methods}> */}
      <Typography variant="h3" color="grey.800">
        Create dashboard
      </Typography>
      <Grid
        container
        sx={{
          borderBottom: '1px solid',
          borderColor: 'grey.700',
          mt: '16px',
          mb: '24px',
          pb: '24px',
          height: '70vh',
        }}
      >
        <Grid item xs={6}></Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'grey.700',
            p: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Typography variant="subtitle1" color="slateBlue.main">
              Details view
            </Typography>
            <Box sx={{ pointerEvents: 'none', userSelect: 'none' }}>
              <Image
                src={ExampleDashboard}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
                alt={'ExampleDashboard'}
              />
            </Box>
            <div></div>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button
          sx={{
            color: theme.palette?.grey[500],
            border: '1px solid',
            borderColor: 'grey.700',
            padding: '0px 22px',
            height: '44px',
            fontWeight: '500',
            '&:hover': { bgcolor: theme.palette.grey[400] },
          }}
          onClick={() => {}}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            padding: '0px 22px',
            height: '44px',
            fontWeight: '500',
          }}
          onClick={() => {}}
          type="submit"
        >
          Create
        </Button>
      </Box>
      {/* </FormProvider> */}
    </>
  );
};
