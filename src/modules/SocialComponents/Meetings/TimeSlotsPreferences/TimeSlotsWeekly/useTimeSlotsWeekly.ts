import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = () => {
  const [timeSlotsState, setTimeSlotsState] = useState([]);
  const { fields, append, remove } = useFieldArray({
    name: 'timeSlot',
  });

  const handleAddTimeSlot = (dayIndex: any) => {
    append({ dayIndex, slots: [{ start: new Date(), end: new Date() }] });
  };

  const fieldsAdded = new Set(fields?.map((field: any) => field?.dayIndex));

  return {
    fields,
    append,
    remove,
    handleAddTimeSlot,
    fieldsAdded,
    timeSlotsState,
    setTimeSlotsState,
  };
};
