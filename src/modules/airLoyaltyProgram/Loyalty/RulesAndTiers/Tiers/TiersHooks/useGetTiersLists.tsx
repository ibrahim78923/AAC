import {
  loyaltyProgramTiersPageLimitSelector,
  loyaltyProgramTiersPageSelector,
  loyaltyProgramTiersSearchSelector,
} from '@/redux/slices/airLoyaltyProgram/tiers/selectors';
import { setTiersListsTotalRecords } from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetLoyaltyProgramLoyaltyTiersListQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const useGetTiersLists = () => {
  const [
    lazyGetLoyaltyProgramLoyaltyTiersListTrigger,
    lazyGetLoyaltyProgramLoyaltyTiersListStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetLoyaltyProgramLoyaltyTiersListQuery?.();

  const dispatch = useAppDispatch();

  const page = useAppSelector(loyaltyProgramTiersPageSelector);
  const pageLimit = useAppSelector(loyaltyProgramTiersPageLimitSelector);
  const search = useAppSelector(loyaltyProgramTiersSearchSelector);

  const getLoyaltyProgramTiersList = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search,
      },
    };
    try {
      const response = (await lazyGetLoyaltyProgramLoyaltyTiersListTrigger?.(
        apiDataParameter,
      )?.unwrap()) as any;
      dispatch(
        setTiersListsTotalRecords?.(response?.data?.data?.tiers?.length),
      );
    } catch (error: any) {}
  };

  return {
    getLoyaltyProgramTiersList,
    lazyGetLoyaltyProgramLoyaltyTiersListStatus,
    page,
    pageLimit,
    search,
  };
};
