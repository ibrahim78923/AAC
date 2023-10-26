import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useDetailTaskDrawer = () => {
  const [drawerStatusVal, setDrawerStatusVal] = useState(null);
  const [drawerStatusPop, setDrawerStatusPop] =
    useState<HTMLButtonElement | null>(null);
  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDrawerStatusPop(event.currentTarget);
  };
  const handleStatusClose = () => {
    setDrawerStatusPop(null);
  };
  const openDrawerStatus = Boolean(drawerStatusPop);
  const handleStatusItemClick = (selectedStatus: any) => {
    setDrawerStatusVal(selectedStatus);
    setDrawerStatusPop(null);
  };
  const theme = useTheme();
  return {
    drawerStatusVal,
    drawerStatusPop,
    openDrawerStatus,
    handleStatusClick,
    handleStatusClose,
    handleStatusItemClick,
    theme,
  };
};
