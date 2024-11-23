import { RootState } from '@/redux/store';

export const loyaltyProgramUsersPageSelector = (state: RootState) =>
  state?.loyaltyProgramUsers?.page;

export const loyaltyProgramUsersPageLimitSelector = (state: RootState) =>
  state?.loyaltyProgramUsers?.pageLimit;

export const loyaltyProgramUsersSearchSelector = (state: RootState) =>
  state?.loyaltyProgramUsers?.search;

export const loyaltyProgramUsersIsPortalOpenSelector = (state: RootState) =>
  state?.loyaltyProgramUsers?.isPortalOpen;

export const loyaltyProgramUsersTotalRecordsSelector = (state: RootState) =>
  state?.loyaltyProgramUsers?.totalRecords;

export const loyaltyProgramUsersSelectedUsersListsSelector = (
  state: RootState,
) => state?.loyaltyProgramUsers?.selectedUsersLists;
