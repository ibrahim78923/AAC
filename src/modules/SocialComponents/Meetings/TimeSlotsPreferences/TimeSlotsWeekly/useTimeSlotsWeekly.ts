import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = (props: any) => {
  const { setTimeSlotsState } = props;
  const { fields, append, remove } = useFieldArray({
    name: 'daysTimeRanges',
  });

  const handleAddTimeSlot = (dayIndex: any, dayName: any) => {
    append({
      days: dayName,
      timeRanges: [{ startHour: new Date(), endHour: new Date() }],
      dayIndex: dayIndex,
    });
    setTimeSlotsState((prevState: any[]) => [
      ...prevState,
      {
        dayIndex,
        dayName,
        timeRanges: [{ startHour: new Date(), endHour: new Date() }],
      },
    ]);
  };

  const handleCheckboxChange = (day: any, index: number) => {
    setTimeSlotsState((prev: any) => {
      const dayIndex = prev?.findIndex((d: any) => d?.dayName === day);
      if (dayIndex !== -1) {
        const newState = [...prev];
        newState?.splice(dayIndex, 1);
        return newState;
      } else {
        const newDay = {
          dayIndex: index,
          dayName: day,
          timeRanges: [{ startHour: new Date(), endHour: new Date() }],
        };
        return [...prev, newDay];
      }
    });
  };
  const handleRemoveTimeSlot = (fieldIndex: any) => {
    remove(fieldIndex);
    setTimeSlotsState(
      (prevState: any) =>
        prevState?.filter((_: any, index: any) => index !== fieldIndex),
    );
  };
  const fieldsAdded = new Set(fields?.map((field: any) => field?.dayIndex));

  return {
    fields,
    append,
    handleRemoveTimeSlot,
    handleAddTimeSlot,
    fieldsAdded,
    handleCheckboxChange,
  };
};
