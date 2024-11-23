import { RootState } from '@/redux/store';

export const loyaltyProgramTiersPageSelector = (state: RootState) =>
  state?.loyaltyProgramTiers?.page;

export const loyaltyProgramTiersPageLimitSelector = (state: RootState) =>
  state?.loyaltyProgramTiers?.pageLimit;

export const loyaltyProgramTiersSearchSelector = (state: RootState) =>
  state?.loyaltyProgramTiers?.search;

export const loyaltyProgramTiersIsPortalOpenSelector = (state: RootState) =>
  state?.loyaltyProgramTiers?.isPortalOpen;

export const loyaltyProgramTiersTotalRecordsSelector = (state: RootState) =>
  state?.loyaltyProgramTiers?.totalRecords;
