import { Grid } from '@mui/material';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFRadioGroup,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { WorkflowDateRange } from '../WorkflowDateRange';
import { useWorkflowSchedule } from './useWorkflowSchedule';
import {
  radioOptions,
  scheduleOptions,
  scheduleTypes,
  weekOptions,
} from './WorkflowSchedule.data';

export const WorkflowSchedule = (props: any) => {
  const { register, setValue } = props;
  const { selectedSchedule, selectedScheduleRadio, selectedScheduleWeek } =
    useWorkflowSchedule(props);

  return (
    <>
      <Grid item xs={12}>
        <RHFRadioGroup
          name="scheduleWorkflow"
          options={radioOptions}
          inputRef={register}
        />
      </Grid>
      {selectedScheduleRadio === scheduleTypes?.schedule && (
        <>
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
        </>
      )}
    </>
  );
};
