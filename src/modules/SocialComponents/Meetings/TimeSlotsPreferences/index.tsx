import TimeSlotsHeader from './TimeSlotsHeader';
import TimeSlotsWeekly from './TimeSlotsWeekly';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useTimeSlotPreferences } from './useTimeSlotPreferences';

export const TimeSlotPreferences = () => {
  const { methods } = useTimeSlotPreferences();
  return (
    <>
      <FormProvider methods={methods}>
        <TimeSlotsHeader />
        <Grid container>
          <Grid item xs={6}>
            <TimeSlotsWeekly />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
