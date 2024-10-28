import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useMemo } from 'react';
import { useGetUserLists } from '../UserHook/useGetUserLists';
import { operationUsersListColumnsDynamic } from './UserList.data';
import {
  setPage,
  setPageIncrement,
  setPageLimit,
  setSelectedUsersLists,
  setPageDecrement,
} from '@/redux/slices/airOperations/users/slice';
import { getActivePermissionsSession } from '@/utils';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';

export const useUserList = () => {
  const {
    getOperationUsersList,
    lazyGetProductUserListForOperationStatus,
    page,
    pageLimit,
    search,
  } = useGetUserLists?.();

  const dispatch = useAppDispatch();

  const canChangeUserStatus = useMemo(() => {
    const permissions = getActivePermissionsSession();
    return permissions?.includes(
      AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.ACTIVE_INACTIVE_USER,
    );
  }, []);

  const selectedUsersLists = useAppSelector(
    (state) => state?.operationsUsersLists?.selectedUsersLists,
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
  const refetch = () => getOperationUsersList?.(page);

  useEffect(() => {
    getOperationUsersList?.();
  }, [page, search, pageLimit]);

  const totalUsers =
    lazyGetProductUserListForOperationStatus?.data?.data?.usercompanyaccounts;

  const operationUsersListColumns = operationUsersListColumnsDynamic?.(
    selectedUsersLists,
    setSelectedUserList,
    totalUsers,
    canChangeUserStatus,
  );

  const isApiCalled =
    !lazyGetProductUserListForOperationStatus?.data &&
    !lazyGetProductUserListForOperationStatus?.error;

  return {
    operationUsersListColumns,
    lazyGetProductUserListForOperationStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  };
};
