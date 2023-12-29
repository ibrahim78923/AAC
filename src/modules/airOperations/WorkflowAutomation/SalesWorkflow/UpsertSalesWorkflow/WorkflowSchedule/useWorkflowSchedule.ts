import { useEffect } from 'react';
import { scheduleTypes } from './WorkflowSchedule.data';

export const useWorkflowSchedule = (props: any) => {
  const { watch, setValue } = props;
  const selectedSchedule = watch('schedule');
  const selectedScheduleRadio = watch('scheduleWorkflow');
  const selectedScheduleWeek = watch('scheduleDay');
  const scheduleWorkflow = watch('scheduleWorkflow');
  useEffect(() => {
    if (selectedSchedule !== scheduleTypes?.weekly) {
      setValue('scheduleDay', '');
    }
  }, [selectedSchedule]);
  useEffect(() => {
    if (scheduleWorkflow !== scheduleTypes?.schedule) {
      setValue('schedule', '');
    }
  }, [scheduleWorkflow]);
  return {
    selectedSchedule,
    selectedScheduleRadio,
    selectedScheduleWeek,
  };
};
