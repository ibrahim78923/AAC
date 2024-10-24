import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import {
  setPage,
  setPageIncrement,
  setPageLimit,
  setPageDecrement,
} from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { setIsPortalOpen } from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useGetTiersLists } from '../TiersHooks/useGetTiersLists';
import { tiersListColumnsDynamic } from './TiersList.data';

export const useTiersList = () => {
  const {
    getLoyaltyProgramTiersList,
    lazyGetLoyaltyProgramLoyaltyTiersListStatus,
    page,
    pageLimit,
    search,
  } = useGetTiersLists?.();

  const dispatch = useAppDispatch();

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());
  const refetch = () => getLoyaltyProgramTiersList?.(page);

  useEffect(() => {
    getLoyaltyProgramTiersList?.();
  }, [page, search, pageLimit]);

  const setAction = (action: any, data: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action,
        data,
      }),
    );
  };

  const tiersListColumns = tiersListColumnsDynamic?.(setAction);

  const isApiCalled =
    !lazyGetLoyaltyProgramLoyaltyTiersListStatus?.data &&
    !lazyGetLoyaltyProgramLoyaltyTiersListStatus?.error;

  return {
    tiersListColumns,
    lazyGetLoyaltyProgramLoyaltyTiersListStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  };
};
