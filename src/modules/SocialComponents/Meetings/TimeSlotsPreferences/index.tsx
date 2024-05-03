import TimeSlotsHeader from './TimeSlotsHeader';
import TimeSlotsWeekly from './TimeSlotsWeekly';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Divider, Grid } from '@mui/material';
import { useTimeSlotPreferences } from './useTimeSlotPreferences';
import DateOverrides from './DateOverrides';
import BufferTime from './BufferTime';

export const TimeSlotPreferences = () => {
  const { methods, disabled, setDisabled, theme } = useTimeSlotPreferences();
  return (
    <>
      <FormProvider methods={methods}>
        <TimeSlotsHeader disabled={disabled} setDisabled={setDisabled} />
        <Grid container gap={1}>
          <Grid item lg={6} xs={12} mr={2}>
            <TimeSlotsWeekly disabled={disabled} theme={theme} />
          </Grid>
          <Grid item lg={5} xs={12}>
            <DateOverrides disabled={disabled} theme={theme} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Box pt={2} mb={2}>
          <BufferTime disabled={disabled} theme={theme} />
        </Box>
      </FormProvider>
    </>
  );
};
