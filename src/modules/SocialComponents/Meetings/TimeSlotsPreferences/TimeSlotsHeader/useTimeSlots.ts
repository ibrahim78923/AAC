import { timeSlotsActionsDropdown } from './TimeSlots.data';

export const useTimeSlots = (props: any) => {
  const { selectedMonths, setSelectedMonths } = props;
  const timeSlotsData = timeSlotsActionsDropdown(
    selectedMonths,
    setSelectedMonths,
  );
  return {
    timeSlotsData,
  };
};
