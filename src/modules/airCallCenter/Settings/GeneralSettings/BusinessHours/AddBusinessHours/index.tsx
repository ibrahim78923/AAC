import React from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { styles } from './AddBusinessHours.styles';
import useAddBusinessHours from './useAddBusinessHours';
import { FormProvider } from '@/components/ReactHookForm';
import { AddBusinessHoursFields } from './AddBusinessHours.data';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import SetBusinessHours from './SetBusinessHours';
import Holidays from './Holidays';
import { BackArrIcon } from '@/assets/icons';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';

const AddBusinessHours = () => {
  const {
    methodsAddBusinessHours,
    onSubmit,
    handleSubmit,
    navigate,
    formValues,
  } = useAddBusinessHours();

  return (
    <>
      <Box sx={styles?.pageHeader}>
        <Box
          sx={styles?.arrowBack}
          onClick={() => {
            navigate?.push(AIR_CALL_CENTER?.SETTINGS?.BUSINESS_HOURS);
          }}
        >
          <BackArrIcon />
        </Box>
        <Typography variant="h3">{formValues} Business Hours</Typography>
      </Box>
      <FormProvider
        methods={methodsAddBusinessHours}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ maxWidth: '528px' }}>
          <Grid container spacing={'22px'}>
            {AddBusinessHoursFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: '14px', mb: '2rem' }}>
          <HorizontalTabs tabsDataArray={['Set Business Hours', 'Holidays']}>
            <SetBusinessHours />
            <Holidays />
          </HorizontalTabs>
        </Box>
        <Box sx={{ mt: '1rem', mb: '1rem' }}>
          <Divider />
        </Box>
        <Box
          sx={{
            position: 'relative',
            bottom: '1rem',
            right: '2rem',
            mt: '4rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            <Button type={'button'} variant={'outlined'} color={'inherit'}>
              cancel
            </Button>
            <Button variant="contained" type="submit">
              save
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

export default AddBusinessHours;
