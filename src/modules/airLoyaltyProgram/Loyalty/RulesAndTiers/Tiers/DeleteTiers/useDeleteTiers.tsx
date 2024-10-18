import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useDeleteLoyaltyProgramLoyaltySingleTierMutation } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useGetTiersLists } from '../TiersHooks/useGetTiersLists';

export const useDeleteTiers = () => {
  const [
    deleteLoyaltyProgramLoyaltySingleTierTrigger,
    deleteLoyaltyProgramLoyaltySingleTierStatus,
  ] = useDeleteLoyaltyProgramLoyaltySingleTierMutation();

  const { getLoyaltyProgramTiersList, page } = useGetTiersLists();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramTiers?.isPortalOpen,
  );

  const totalRecords = useAppSelector(
    (state) => state?.loyaltyProgramTiers?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      totalRecords === SELECTED_ARRAY_LENGTH?.ONE
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getLoyaltyProgramTiersList?.();
  };

  const deleteLoyaltyTier = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteLoyaltyProgramLoyaltySingleTierTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar?.('Tier deleted successfully!');
      closePortal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePortal = () => {
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress =
    deleteLoyaltyProgramLoyaltySingleTierStatus?.isLoading;

  return {
    deleteLoyaltyTier,
    closePortal,
    apiCallInProgress,
    isPortalOpen,
  };
};
