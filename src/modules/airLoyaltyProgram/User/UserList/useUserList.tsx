import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useGetUserLists } from '../UserHook/useGetUserLists';
import { loyaltyProgramUsersListColumnsDynamic } from './UserList.data';
import {
  setPage,
  setPageIncrement,
  setPageLimit,
  setSelectedUsersLists,
  setPageDecrement,
} from '@/redux/slices/airLoyaltyProgram/users/slice';

export const useUserList = () => {
  const {
    getLoyaltyProgramUsersList,
    lazyGetLoyaltyProgramUserManagementProductUserListsStatus,
    page,
    pageLimit,
    search,
  } = useGetUserLists?.();

  const dispatch = useAppDispatch();

  const selectedUsersLists = useAppSelector(
    (state) => state?.loyaltyProgramUsers?.selectedUsersLists,
  );

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedUserList = (user: any) => {
    dispatch(setSelectedUsersLists<any>(user));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());
  const refetch = () => getLoyaltyProgramUsersList?.(page);

  useEffect(() => {
    getLoyaltyProgramUsersList?.();
  }, [page, search, pageLimit]);

  const totalUsers =
    lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data?.data
      ?.usercompanyaccounts;

  const loyaltyProgramUsersListColumns =
    loyaltyProgramUsersListColumnsDynamic?.(
      selectedUsersLists,
      setSelectedUserList,
      totalUsers,
    );

  const isApiCalled =
    !lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data &&
    !lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.error;

  return {
    loyaltyProgramUsersListColumns,
    lazyGetLoyaltyProgramUserManagementProductUserListsStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  };
};
