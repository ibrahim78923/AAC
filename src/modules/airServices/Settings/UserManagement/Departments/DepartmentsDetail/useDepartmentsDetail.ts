import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useDepartmentsDetail = () => {
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const theme: any = useTheme();
  return {
    theme,
    actionPop,
    setActionPop,
    handleActionClick,
    handleActionClose,
    openAction,
  };
};
