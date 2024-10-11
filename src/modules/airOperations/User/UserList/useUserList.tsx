import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useGetUserLists } from '../UserHook/useGetUserLists';
import { operationUsersListColumnsDynamic } from './UserList.data';
import {
  setPage,
  setPageIncrement,
  setPageLimit,
  setSelectedUsersLists,
  setPageDecrement,
} from '@/redux/slices/airOperations/users/slice';

export const useUserList = () => {
  const {
    getOperationUsersList,
    lazyGetProductUserListForOperationStatus,
    page,
    pageLimit,
    search,
  } = useGetUserLists?.();

  const dispatch = useAppDispatch();

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
