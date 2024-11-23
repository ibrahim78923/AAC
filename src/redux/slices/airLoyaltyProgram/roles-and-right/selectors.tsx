import { RootState } from '@/redux/store';

export const loyaltyProgramRoleAndRightsPageSelector = (state: RootState) =>
  state?.loyaltyProgramRoleAndRights?.page;

export const loyaltyProgramRoleAndRightsPageLimitSelector = (
  state: RootState,
) => state?.loyaltyProgramRoleAndRights?.pageLimit;

export const loyaltyProgramRoleAndRightsSearchSelector = (state: RootState) =>
  state?.loyaltyProgramRoleAndRights?.search;

export const loyaltyProgramRoleAndRightsIsPortalOpenSelector = (
  state: RootState,
) => state?.loyaltyProgramRoleAndRights?.isPortalOpen;

export const loyaltyProgramRoleAndRightsTotalRecordsSelector = (
  state: RootState,
) => state?.loyaltyProgramRoleAndRights?.totalRecords;

export const loyaltyProgramRoleAndRightsSelectedRoleAndRightsListsSelector = (
  state: RootState,
) => state?.loyaltyProgramRoleAndRights?.selectedRoleAndRightsLists;
