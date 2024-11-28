import { RootState } from '@/redux/store';

export const loyaltyProgramRulesPageSelector = (state: RootState) =>
  state?.loyaltyProgramRules?.page;

export const loyaltyProgramRulesPageLimitSelector = (state: RootState) =>
  state?.loyaltyProgramRules?.pageLimit;

export const loyaltyProgramRulesSearchSelector = (state: RootState) =>
  state?.loyaltyProgramRules?.search;

export const loyaltyProgramRulesIsPortalOpenSelector = (state: RootState) =>
  state?.loyaltyProgramRules?.isPortalOpen;

export const loyaltyProgramRulesTotalRecordsSelector = (state: RootState) =>
  state?.loyaltyProgramRules?.totalRecords;
