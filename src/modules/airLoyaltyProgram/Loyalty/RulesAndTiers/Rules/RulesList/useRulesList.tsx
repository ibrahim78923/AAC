import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import {
  setPage,
  setPageIncrement,
  setPageLimit,
  setPageDecrement,
} from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { rulesListColumnsDynamic } from './RulesList.data';
import { useGetRulesLists } from '../RulesHooks/useGetRulesLists';
import { setIsPortalOpen } from '@/redux/slices/airLoyaltyProgram/rules/slice';

export const useRulesList = () => {
  const {
    getLoyaltyProgramRulesList,
    lazyGetLoyaltyProgramLoyaltyRulesListStatus,
    page,
    pageLimit,
    search,
  } = useGetRulesLists?.();

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
  const refetch = () => getLoyaltyProgramRulesList?.(page);

  useEffect(() => {
    getLoyaltyProgramRulesList?.();
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

  const rulesListColumns = rulesListColumnsDynamic?.(setAction);

  const isApiCalled =
    !lazyGetLoyaltyProgramLoyaltyRulesListStatus?.data &&
    !lazyGetLoyaltyProgramLoyaltyRulesListStatus?.error;

  return {
    rulesListColumns,
    lazyGetLoyaltyProgramLoyaltyRulesListStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  };
};
