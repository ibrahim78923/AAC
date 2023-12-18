import { useEffect } from 'react';
import { scheduleTypes } from './WorkflowSchedule.data';
import { useTheme } from '@mui/material';

export const useWorkflowSchedule = (props: any) => {
  const theme = useTheme();
  const { watch, setValue } = props;
  const selectedSchedule = watch('schedule');
  const selectedScheduleWeek = watch('scheduleDay');
  useEffect(() => {
    if (selectedSchedule !== scheduleTypes?.weekly) {
      setValue('scheduleDay', '');
    }
  }, [selectedSchedule]);
  return {
    selectedSchedule,
    selectedScheduleWeek,
    theme,
  };
};
