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

  const page = useAppSelector((state) => state?.loyaltyProgramRules?.page);

  const pageLimit = useAppSelector(
    (state) => state?.loyaltyProgramRules?.pageLimit,
  );

  const search = useAppSelector((state) => state?.loyaltyProgramRules?.search);

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
