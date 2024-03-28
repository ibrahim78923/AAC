import { Grid } from '@mui/material';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDateRangePicker,
  RHFRadioGroup,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { useWorkflowSchedule } from './useWorkflowSchedule';
import {
  radioOptions,
  scheduleOptions,
  scheduleTypes,
  weekOptions,
} from './WorkflowSchedule.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';

export const WorkflowSchedule = (props: any) => {
  const { selectedSchedule, selectedScheduleRadio, selectedScheduleWeek } =
    useWorkflowSchedule(props);

  return (
    <>
      <Grid item lg={5.6} sm={8.6}>
        <RHFRadioGroup
          name="type"
          options={radioOptions}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        />
      </Grid>
      {selectedScheduleRadio === scheduleTypes?.schedule && (
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.SCHEDULE,
          ]}
        >
          <Grid item xs={12} md={6.5} mt={1}>
            <RHFAutocomplete
              name="schedule"
              label="Schedule"
              size="small"
              placeholder="Select"
              options={scheduleOptions}
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
                options={weekOptions}
                fullWidth
              />
            )}
          </Grid>
          <Grid item xs={12} md={6.5}>
            {selectedSchedule === scheduleTypes?.customRange && (
              <RHFDateRangePicker
                name="custom"
                size="small"
                label="Custom Range"
              />
            )}
          </Grid>
          <Grid item xs={12} md={6.5}>
            {(selectedSchedule === scheduleTypes?.daily ||
              selectedSchedule === scheduleTypes?.schedule ||
              selectedScheduleWeek ||
              selectedSchedule === scheduleTypes?.customRange ||
              selectedSchedule === scheduleTypes?.annually ||
              selectedSchedule === scheduleTypes?.monthly) && (
              <RHFTimePicker name="time" label="Time" size="small" fullWidth />
            )}
          </Grid>
        </PermissionsGuard>
      )}
    </>
  );
};
