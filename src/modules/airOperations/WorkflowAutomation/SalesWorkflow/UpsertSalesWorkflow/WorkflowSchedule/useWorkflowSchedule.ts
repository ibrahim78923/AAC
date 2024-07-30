import { useEffect } from 'react';
import { scheduleTypes } from './WorkflowSchedule.data';
import { useRouter } from 'next/router';
import { WorkflowScheduleI } from './WorkflowSchedule.interface';

export const useWorkflowSchedule = (props: WorkflowScheduleI) => {
  const { watch, setValue } = props;
  const selectedSchedule = watch('schedule');
  const selectedScheduleRadio = watch('type');
  const selectedScheduleWeek = watch('scheduleDay');
  const router = useRouter();
  if (router?.query?.id === undefined) {
    useEffect(() => {
      if (selectedSchedule !== scheduleTypes?.weekly) {
        setValue('scheduleDay', '');
      }
    }, [selectedSchedule]);
  }
  if (router?.query?.id === undefined) {
    useEffect(() => {
      if (selectedScheduleRadio !== scheduleTypes?.schedule) {
        setValue('schedule', '');
      }
    }, [selectedScheduleRadio]);
  }
  return {
    selectedSchedule,
    selectedScheduleRadio,
    selectedScheduleWeek,
  };
};
