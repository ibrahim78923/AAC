import { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
export const useBusinessHour = () => {
  const router = useRouter();
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const handleActionClick = (event: MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  return {
    router,
    openAction,
    handleActionClick,
    handleActionClose,
    actionPop,
  };
};
