import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDateRangePicker,
  RHFRadioGroup,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { useWorkflowSchedule } from './useWorkflowSchedule';
import {
  numberDaysOptions,
  radioOptions,
  scheduleOptions,
  scheduleTypes,
  weekOptions,
} from './WorkflowSchedule.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { WorkflowScheduleI } from './WorkflowSchedule.interface';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const WorkflowSchedule = (props: WorkflowScheduleI) => {
  const { selectedSchedule, selectedScheduleRadio, selectedScheduleWeek } =
    useWorkflowSchedule(props);
  return (
    <>
      <CustomGrid lg={5.6} sm={8.6}>
        <RHFRadioGroup
          name="type"
          options={radioOptions}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        />
      </CustomGrid>
      {selectedScheduleRadio === scheduleTypes?.schedule && (
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.SCHEDULE,
          ]}
        >
          <CustomGrid md={6.5} customStyles={{ mt: 1 }}>
            <RHFAutocomplete
              name="schedule"
              label="Schedule"
              size="small"
              placeholder="Select"
              required
              options={scheduleOptions}
              fullWidth
            />
          </CustomGrid>
          <CustomGrid md={6.5}>
            {selectedSchedule === scheduleTypes?.annually && (
              <RHFDatePicker
                name="scheduleMonth"
                size="small"
                label="Month"
                fullWidth
                views={['month']}
                format="MMMM"
              />
            )}
          </CustomGrid>
          <CustomGrid md={6.5}>
            {selectedSchedule === scheduleTypes?.monthly && (
              <RHFAutocomplete
                name="scheduleDate"
                label="Day of month"
                size="small"
                options={numberDaysOptions}
                placeholder="Select Day of Month"
                getOptionLabel={(option: any) => option?.toString()}
                fullWidth
              />
            )}
          </CustomGrid>
          <CustomGrid md={6.5}>
            {selectedSchedule === scheduleTypes?.weekly && (
              <RHFAutocomplete
                name="scheduleDay"
                size="small"
                label="Day of week"
                placeholder="Select Day"
                options={weekOptions}
                fullWidth
              />
            )}
          </CustomGrid>
          <CustomGrid md={6.5}>
            {selectedSchedule === scheduleTypes?.customRange && (
              <RHFDateRangePicker
                name="custom"
                size="small"
                label="Custom Range"
              />
            )}
          </CustomGrid>
          <CustomGrid md={6.5}>
            {(selectedSchedule === scheduleTypes?.daily ||
              selectedSchedule === scheduleTypes?.schedule ||
              selectedScheduleWeek ||
              selectedSchedule === scheduleTypes?.customRange ||
              selectedSchedule === scheduleTypes?.annually ||
              selectedSchedule === scheduleTypes?.monthly) && (
              <RHFTimePicker name="time" label="Time" size="small" fullWidth />
            )}
          </CustomGrid>
        </PermissionsGuard>
      )}
    </>
  );
};
