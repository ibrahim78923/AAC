import { setIsPortalClose } from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

export const useUpsertTiers = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramTiers?.isPortalOpen,
  );
  const closePortal = () => {
    dispatch(setIsPortalClose());
  };

  return {
    isPortalOpen,
    closePortal,
  };
};
