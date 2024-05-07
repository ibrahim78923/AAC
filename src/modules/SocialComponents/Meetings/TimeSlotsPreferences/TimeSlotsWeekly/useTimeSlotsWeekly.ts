import { timeSlotsWeeklyDropdown } from './TimeSlotWeekly.data';
import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'timeSlot',
  });
  const timeSlotsData = timeSlotsWeeklyDropdown();

  const handleAddTimeSlot = (dayIndex: number) => {
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
