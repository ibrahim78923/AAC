import { Box, Typography } from '@mui/material';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDateRangePicker,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { useWorkflowSchedule } from './useWorkflowSchedule';
import {
  numberDaysOptions,
  scheduleOptions,
  scheduleTypes,
  weekOptions,
} from './WorkflowSchedule.data';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const WorkflowSchedule = (props: any) => {
  const { selectedSchedule, selectedScheduleWeek, theme } =
    useWorkflowSchedule(props);

  return (
    <>
      <CustomGrid
        customStyles={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          borderRadius: 2,
          mt: 1,
        }}
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
          <CustomGrid md={6.5} customStyles={{ mt: 1 }}>
            <RHFAutocomplete
              name="schedule"
              label="Schedule"
              size="small"
              placeholder="Select"
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
        </Box>
      </CustomGrid>
    </>
  );
};
