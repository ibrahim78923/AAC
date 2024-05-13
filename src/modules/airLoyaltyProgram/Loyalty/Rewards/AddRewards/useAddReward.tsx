import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAuthAccountsForRewardsQuery } from '@/services/airLoyaltyProgram/loyalty/rewards';
import { PRODUCTS_LISTS } from '@/constants/strings';

export const useAddRewards = () => {
  const { palette } = useTheme();
  const [openDrawer, setOpenDrawer] = useState<any>({});
  const router = useRouter();

  const addRewardOpenForm = (item: any) => {
    setOpenDrawer({ isOpen: true, rewardType: item?.name });
  };

  const accounts = useGetAuthAccountsForRewardsQuery?.({});

  const airSalesAccount = () =>
    accounts?.data?.data?.find(
      (account: any) => account?.name === PRODUCTS_LISTS?.AIR_SALES,
    )?._id;

  return {
    palette,
    openDrawer,
    router,
    setOpenDrawer,
    addRewardOpenForm,
    airSalesAccount,
  };
};
