import { useEffect, useState } from 'react';
import { useLazyGetLoyaltyProgramLoyaltySingleTierDetailsQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';

export const useSingleTierDetail = (props: any) => {
  const { setIsDrawerOpen, isDrawerOpen } = props;
  const [isUpdateDrawer, setIsUpdateDrawer] = useState<any>({});
  const closeUpsertTier = () => {
    setIsDrawerOpen?.(false);
  };
  const sliderValue = [0, 100];
  const [getSingleTierTrigger, { data, isLoading, isFetching, isError }]: any =
    useLazyGetLoyaltyProgramLoyaltySingleTierDetailsQuery();

  const handleGetSingleTier = async () => {
    await getSingleTierTrigger(isDrawerOpen?.isDetail?._id);
  };

  useEffect(() => {
    handleGetSingleTier();
  }, [isDrawerOpen?.isDetail]);

  return {
    closeUpsertTier,
    data,
    isLoading,
    isFetching,
    sliderValue,
    isError,
    isUpdateDrawer,
    setIsUpdateDrawer,
  };
};
