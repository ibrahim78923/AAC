import {
  loyaltyProgramRulesPageLimitSelector,
  loyaltyProgramRulesPageSelector,
  loyaltyProgramRulesSearchSelector,
} from '@/redux/slices/airLoyaltyProgram/rules/selectors';
import { setRulesListTotalRecords } from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetLoyaltyProgramLoyaltyRulesListQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const useGetRulesLists = () => {
  const [
    lazyGetLoyaltyProgramLoyaltyRulesListTrigger,
    lazyGetLoyaltyProgramLoyaltyRulesListStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetLoyaltyProgramLoyaltyRulesListQuery?.();

  const dispatch = useAppDispatch();

  const page = useAppSelector(loyaltyProgramRulesPageSelector);

  const pageLimit = useAppSelector(loyaltyProgramRulesPageLimitSelector);

  const search = useAppSelector(loyaltyProgramRulesSearchSelector);

  const getLoyaltyProgramRulesList = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search,
      },
    };
    try {
      const response = (await lazyGetLoyaltyProgramLoyaltyRulesListTrigger?.(
        apiDataParameter,
      )?.unwrap()) as any;
      dispatch(setRulesListTotalRecords(response?.data?.tierRules?.length));
    } catch (error: any) {}
  };

  return {
    getLoyaltyProgramRulesList,
    lazyGetLoyaltyProgramLoyaltyRulesListStatus,
    page,
    pageLimit,
    search,
  };
};
