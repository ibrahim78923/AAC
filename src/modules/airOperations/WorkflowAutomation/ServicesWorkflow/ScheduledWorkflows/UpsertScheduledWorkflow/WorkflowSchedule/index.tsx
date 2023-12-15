import { Box, Grid, Typography } from '@mui/material';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { WorkflowDateRange } from '../WorkflowDateRange';
import { useWorkflowSchedule } from './useWorkflowSchedule';
import {
  scheduleOptions,
  scheduleTypes,
  weekOptions,
} from './WorkflowSchedule.data';

export const WorkflowSchedule = (props: any) => {
  const { register, setValue } = props;
  const { selectedSchedule, selectedScheduleWeek, theme } =
    useWorkflowSchedule(props);

  return (
    <>
      <Grid
        item
        xs={12}
        mt={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
        borderRadius={2}
      >
        <Box
          sx={{
            backgroundColor: theme?.palette?.primary?.light,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            p={1.5}
            borderBottom={`1px solid ${theme?.palette?.custom?.off_white_three}`}
          >
            Schedule Event
          </Typography>
        </Box>
        <Box p={1}>
          <Grid item xs={12} md={6.5} mt={1}>
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
          <Grid item xs={12} md={6.5}>
            {selectedSchedule === scheduleTypes?.annually && (
              <RHFDatePicker
                name="scheduleMonth"
                size="small"
                label="Month"
                fullWidth
                views={['month']}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6.5}>
            {selectedSchedule === scheduleTypes?.monthly && (
              <RHFDatePicker
                name="scheduleDate"
                label="Day of month"
                size="small"
                fullWidth
              />
            )}
          </Grid>
          <Grid item xs={12} md={6.5}>
            {selectedSchedule === scheduleTypes?.weekly && (
              <RHFAutocomplete
                name="scheduleDay"
                size="small"
                label="Day of week"
                inputRef={register}
                options={weekOptions}
                fullWidth
              />
            )}
          </Grid>
          <Grid item xs={12} md={6.5}>
            {(selectedSchedule === scheduleTypes?.daily ||
              selectedScheduleWeek) && (
              <RHFTimePicker
                name="scheduleTime"
                label="Time"
                size="small"
                fullWidth
              />
            )}
            {selectedSchedule === scheduleTypes?.customRange && (
              <WorkflowDateRange setValue={setValue} />
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
