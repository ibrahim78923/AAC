import { useForm } from 'react-hook-form';
import { defaultValues } from './TimeSlotsWeekly/TimeSlotWeekly.data';

export const useTimeSlotPreferences = () => {
  const methods = useForm({
    defaultValues: defaultValues(),
  });
  return {
    methods,
  };
};
