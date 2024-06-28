import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = (props: any) => {
  const { timeSlotsState, setTimeSlotsState, control } = props;
  const { fields } = useFieldArray({
    name: 'daysTimeRanges',
    control,
  });

  const handleCheckboxChange = (day: any) => {
    setTimeSlotsState((prev: any[]) => {
      if (!Array?.isArray(prev)) {
        prev = [];
      }
      const index = prev?.findIndex((d: any) => d?.dayName === day);
      if (index !== -1) {
        const newState = [...prev];
        newState?.splice(index, 1);
        return newState;
      } else {
        const newDay = {
          dayName: day,
          timeRanges: [{ startHour: new Date(), endHour: new Date() }],
        };
        return [...prev, newDay];
      }
    });
  };

  const isDayChecked = (day: any) => {
    return timeSlotsState?.some((d: any) => d?.dayName === day);
  };

  return {
    fields,
    handleCheckboxChange,
    isDayChecked,
  };
};
