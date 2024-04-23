import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useAddRewards = () => {
  const { palette } = useTheme();
  const [openDrawer, setOpenDrawer] = useState<any>({});
  const router = useRouter();

  const addRewardOpenForm = (item: any) => {
    setOpenDrawer({ isOpen: true, rewardType: item?.name });
  };

  return {
    palette,
    openDrawer,
    router,
    setOpenDrawer,
    addRewardOpenForm,
  };
};
