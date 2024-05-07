import { timeSlotsActionsDropdown } from './TimeSlots.data';

export const useTimeSlots = () => {
  const timeSlotsData = timeSlotsActionsDropdown();
  return {
    timeSlotsData,
  };
};
