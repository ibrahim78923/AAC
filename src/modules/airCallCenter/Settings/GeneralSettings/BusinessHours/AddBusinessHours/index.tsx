import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styles } from './AddBusinessHours.styles';
import useAddBusinessHours from './useAddBusinessHours';
import { FormProvider } from '@/components/ReactHookForm';
import { AddBusinessHoursFields } from './AddBusinessHours.data';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import SetBusinessHours from './SetBusinessHours';
import Holidays from './Holidays';

const AddBusinessHours = () => {
  const { methodsAddBusinessHours, days, handleSelectDays } =
    useAddBusinessHours();
  return (
    <>
      <Box sx={styles?.pageHeader}>
        <Typography variant="h3">Add Business Hours</Typography>
      </Box>
      <FormProvider methods={methodsAddBusinessHours}>
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
        <Box sx={{ mt: '14px' }}>
          <HorizontalTabs tabsDataArray={['Set Business Hours', 'Holidays']}>
            <SetBusinessHours value={days} handleChange={handleSelectDays} />
            <Holidays />
          </HorizontalTabs>
        </Box>
      </FormProvider>
    </>
  );
};

export default AddBusinessHours;
