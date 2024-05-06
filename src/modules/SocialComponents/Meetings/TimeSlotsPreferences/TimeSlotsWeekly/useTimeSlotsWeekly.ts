import { timeSlotsWeeklyDropdown } from './TimeSlotWeekly.data';
import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = () => {
  const timeSlotsData = timeSlotsWeeklyDropdown();
  const { fields, append, remove } = useFieldArray({
    name: 'timeSlot',
  });

  const handleAddTimeSlot = (dayIndex: any) => {
    append({
      dayIndex: dayIndex,
      timeSlotStart: '',
      timeSlotEnd: '',
    });
  };

  const addNewField = (dayIndex: number) => {
    handleAddTimeSlot(dayIndex);
  };

  const fieldsAdded = new Set(fields?.map((field: any) => field?.dayIndex));

  return {
    timeSlotsData,
    fields,
    append,
    remove,
    handleAddTimeSlot,
    addNewField,
    fieldsAdded,
  };
};
