import { Box, Grid } from '@mui/material';
import { RHFAutocomplete, RHFTimePicker } from '@/components/ReactHookForm';
import { useRecurringEmail } from './useRecurringEmail';
import {
  numberDaysOptions,
  scheduleOptions,
  scheduleTypes,
  weekOptions,
} from './RecurringEmail.data';

export const RecurringEmail = (props: any) => {
  const { register } = props;
  const { selectedSchedule } = useRecurringEmail(props);

  return (
    <>
      <Grid item xs={12}>
        <Box mb={2}>
          <Grid item xs={12} pb={1}>
            <RHFAutocomplete
              name="schedule"
              label="Schedule"
              size="small"
              placeholder="Select"
              options={scheduleOptions}
              inputRef={register}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} py={2}>
            <RHFTimePicker
              name="time"
              label="Time of days"
              size="small"
              required={true}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {selectedSchedule === scheduleTypes?.monthly && (
              <RHFAutocomplete
                name="scheduleDate"
                label="Days of month"
                size="small"
                placeholder="Select"
                required={true}
                options={numberDaysOptions}
                getOptionLabel={(option: any) => option}
                fullWidth
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {selectedSchedule === scheduleTypes?.weekly && (
              <RHFAutocomplete
                name="scheduleDay"
                size="small"
                placeholder="Select"
                label="Days of week"
                required={true}
                inputRef={register}
                options={weekOptions}
                fullWidth
              />
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
