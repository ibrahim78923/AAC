import { Box, Checkbox, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFTimePicker } from '@/components/ReactHookForm';

export const timeSlotsData = [{ day: 'Sun' }, { day: 'Mon' }, { day: 'Tue' }];

const TimeSlotsWeekly = () => {
  return (
    <>
      {timeSlotsData?.map((slot: any) => (
        <Grid
          container
          key={slot?._id}
          borderRadius={3}
          py={1}
          borderColor={'divider'}
          gap={1}
        >
          <Grid item xs={12} display={'flex'} alignItems={'center'} gap={1}>
            <Box display={'flex'} alignItems={'center'} width={'100px'}>
              <Checkbox
                icon={<CheckboxIcon />}
                checkedIcon={<CheckboxCheckedIcon />}
              />
              <Typography>{slot?.day}</Typography>
            </Box>
            <Grid container gap={1}>
              <Grid item xs={2}>
                <RHFTimePicker name={`${slot?.day}-start`} />
              </Grid>
              <Grid item xs={2}>
                <RHFTimePicker name={`${slot?.day}-end`} />
              </Grid>
            </Grid>

            <Delete />
            <AddCircleIcon />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default TimeSlotsWeekly;
