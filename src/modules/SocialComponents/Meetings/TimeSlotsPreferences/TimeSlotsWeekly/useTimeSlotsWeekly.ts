import { useTheme } from '@mui/material';
import { timeSlotsWeeklyDropdown } from './TimeSlotWeekly.data';
import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'timeSlot',
  });
  const theme = useTheme();
  const timeSlotsData = timeSlotsWeeklyDropdown();

  const handleAddTimeSlot = (dayIndex: number, slotIndex: number) => {
    append({
      dayIndex: dayIndex,
      slotIndex: slotIndex,
      timeSlotStart: '',
      timeSlotEnd: '',
    });
  };

  const addNewField = (dayIndex: number, slotIndex: number) => {
    handleAddTimeSlot(dayIndex, slotIndex);
  };
  return {
    timeSlotsData,
    theme,
    fields,
    append,
    remove,
    handleAddTimeSlot,
    addNewField,
  };
};
