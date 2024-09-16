import { useAppSelector } from '@/redux/store';
import { useState } from 'react';

export const useViewTimeEntries = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const isTimerPause = useAppSelector(
    (state) => state?.servicesTickets?.isTimerPause,
  );

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    isTimerPause,
  };
};
