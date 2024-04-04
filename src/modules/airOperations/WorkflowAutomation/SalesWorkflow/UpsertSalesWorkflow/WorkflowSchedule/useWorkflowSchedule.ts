import { useEffect } from 'react';
import { scheduleTypes } from './WorkflowSchedule.data';

export const useWorkflowSchedule = (props: any) => {
  const { watch, setValue } = props;
  const selectedSchedule = watch('schedule');
  const selectedScheduleRadio = watch('type');
  const selectedScheduleWeek = watch('scheduleDay');
  useEffect(() => {
    if (selectedSchedule !== scheduleTypes?.weekly) {
      setValue('scheduleDay', '');
    }
  }, [selectedSchedule]);
  useEffect(() => {
    if (selectedScheduleRadio !== scheduleTypes?.schedule) {
      setValue('schedule', '');
    }
  }, [selectedScheduleRadio]);
  return {
    selectedSchedule,
    selectedScheduleRadio,
    selectedScheduleWeek,
  };
};
