import { useState } from 'react';

export const useViewTimeEntries = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isTimerPause, setIsTimerPause] = useState(true);

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    isTimerPause,
    setIsTimerPause,
  };
};
