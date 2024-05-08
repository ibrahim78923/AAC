import { useLazyGetSingleTiersDetailsQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { useEffect } from 'react';

export const useSingleTierDetail = (props: any) => {
  const { setIsDrawerOpen, isDrawerOpen } = props;
  const closeUpsertTier = () => {
    setIsDrawerOpen?.(false);
  };
  const [getSingleTierTrigger, { data, isLoading, isFetching }]: any =
    useLazyGetSingleTiersDetailsQuery();
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
  };
};
