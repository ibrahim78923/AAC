import { timeSlotsActionsDropdown } from './TimeSlots.data';

export const useTimeSlots = (props: any) => {
  const { selectedMonths, setSelectedMonths } = props;
  const timeSlotsMonthsData = timeSlotsActionsDropdown(
    selectedMonths,
    setSelectedMonths,
  );
  return {
    timeSlotsMonthsData,
  };
};
