import TimeSlotsHeader from './TimeSlotsHeader';
import TimeSlotsWeekly from './TimeSlotsWeekly';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useTimeSlotPreferences } from './useTimeSlotPreferences';
import DateOverrides from './DateOverrides';
import BufferTime from './BufferTime';

export const TimeSlotPreferences = () => {
  const {
    disabled,
    setDisabled,
    theme,
    methods,
    onSubmit,
    handleSubmit,
    watch,
    setValue,
  } = useTimeSlotPreferences();
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <TimeSlotsHeader disabled={disabled} setDisabled={setDisabled} />
        <Grid container gap={1}>
          <Grid item lg={6} xs={12} mr={2}>
            <TimeSlotsWeekly
              disabled={disabled}
              theme={theme}
              watch={watch}
              setValue={setValue}
            />
          </Grid>
          <Grid item lg={5} xs={12}>
            <DateOverrides
              disabled={disabled}
              theme={theme}
              methods={methods}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Box pt={2} mb={2}>
          <BufferTime disabled={disabled} theme={theme} />
        </Box>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Box display={'flex'} justifyContent={'flex-end'} gap={1} pt={1}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Apply
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
