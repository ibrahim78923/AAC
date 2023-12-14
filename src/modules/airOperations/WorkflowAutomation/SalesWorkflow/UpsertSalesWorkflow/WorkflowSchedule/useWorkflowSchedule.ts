import { useEffect } from 'react';
import { scheduleTypes } from './WorkflowSchedule.data';

export const useWorkflowSchedule = (props: any) => {
  const { watch, setValue } = props;
  const selectedSchedule = watch('schedule');
  const selectedScheduleRadio = watch('scheduleWorkflow');
  const selectedScheduleWeek = watch('scheduleDay');
  useEffect(() => {
    if (selectedSchedule !== scheduleTypes?.weekly) {
      setValue('scheduleDay', '');
    }
  }, [selectedSchedule]);
  return {
    selectedSchedule,
    selectedScheduleRadio,
    selectedScheduleWeek,
  };
};
