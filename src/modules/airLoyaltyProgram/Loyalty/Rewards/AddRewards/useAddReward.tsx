import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
export const useAddRewards = () => {
  const { palette } = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState('');
  const router = useRouter();
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const addRewardOpenForm = (item: any) => {
    setActionType(item?.name);
    setOpenDrawer(true);
  };
  return {
    palette,
    openDrawer,
    actionType,
    router,
    handleOpenDrawer,
    setActionType,
    setOpenDrawer,
    addRewardOpenForm,
  };
};
